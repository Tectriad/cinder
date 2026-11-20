import {
  forwardRef,
  useState,
  useRef,
  type ReactElement,
  type ReactNode,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "../../utils/cn";
import type { CDSliderProps, CDSliderMarks, CDSliderTooltipConfig } from "./types";

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function roundToStep(val: number, step: number, min: number): number {
  const steps = Math.round((val - min) / step);
  return min + steps * step;
}

export const CDSlider = forwardRef<HTMLDivElement, CDSliderProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      range = false,
      disabled = false,
      vertical = false,
      marks,
      dots = false,
      tooltip = true,
      onChange,
      onAfterChange,
      className,
      style,
      ...restProps
    }: CDSliderProps,
    ref
  ): ReactElement => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeDraggingHandle, setActiveDraggingHandle] = useState<number | null>(null);

    // Initial internal value calculation
    const getInitialValue = (): number | [number, number] => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return range ? [min, Math.min(min + 20, max)] : min;
    };

    const [internalValue, setInternalValue] = useState<number | [number, number]>(
      getInitialValue
    );

    const currentValue: number | [number, number] =
      controlledValue !== undefined ? controlledValue : internalValue;

    // Normalize value to a tuple [val0, val1] for uniform calculations
    const normalizedValues: [number, number] = Array.isArray(currentValue)
      ? [currentValue[0], currentValue[1]]
      : [currentValue, currentValue];

    const getPercentage = (val: number): number => {
      if (max <= min) return 0;
      return clamp(((val - min) / (max - min)) * 100, 0, 100);
    };

    const calculateValueFromPointer = (clientX: number, clientY: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      let ratio = 0;

      if (vertical) {
        ratio = (rect.bottom - clientY) / rect.height;
      } else {
        ratio = (clientX - rect.left) / rect.width;
      }

      const rawVal = min + ratio * (max - min);
      const stepped = roundToStep(rawVal, step, min);
      return clamp(stepped, min, max);
    };

    const handlePointerDown = (
      e: ReactPointerEvent<HTMLDivElement>,
      handleIndex?: number
    ): void => {
      if (disabled) return;
      e.preventDefault();

      const clickedVal = calculateValueFromPointer(e.clientX, e.clientY);

      let targetHandle: number = 0;
      if (range) {
        if (handleIndex !== undefined) {
          targetHandle = handleIndex;
        } else {
          // Find closest handle to clicked position
          const dist0 = Math.abs(clickedVal - normalizedValues[0]);
          const dist1 = Math.abs(clickedVal - normalizedValues[1]);
          targetHandle = dist0 <= dist1 ? 0 : 1;
        }
      }

      setActiveDraggingHandle(targetHandle);

      const updateValue = (newTargetVal: number): void => {
        let nextValue: number | [number, number];

        if (range) {
          const newTuple: [number, number] = [...normalizedValues] as [number, number];
          if (targetHandle === 0) {
            newTuple[0] = Math.min(newTargetVal, newTuple[1]);
          } else {
            newTuple[1] = Math.max(newTargetVal, newTuple[0]);
          }
          nextValue = newTuple;
        } else {
          nextValue = newTargetVal;
        }

        if (controlledValue === undefined) {
          setInternalValue(nextValue);
        }
        if (onChange) {
          onChange(nextValue);
        }
      };

      updateValue(clickedVal);

      const handlePointerMove = (moveEvent: PointerEvent): void => {
        const moveVal = calculateValueFromPointer(moveEvent.clientX, moveEvent.clientY);
        updateValue(moveVal);
      };

      const handlePointerUp = (upEvent: PointerEvent): void => {
        setActiveDraggingHandle(null);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);

        const finalVal = calculateValueFromPointer(upEvent.clientX, upEvent.clientY);
        let finalOutput: number | [number, number];

        if (range) {
          const newTuple: [number, number] = [...normalizedValues] as [number, number];
          if (targetHandle === 0) {
            newTuple[0] = Math.min(finalVal, newTuple[1]);
          } else {
            newTuple[1] = Math.max(finalVal, newTuple[0]);
          }
          finalOutput = newTuple;
        } else {
          finalOutput = finalVal;
        }

        if (onAfterChange) {
          onAfterChange(finalOutput);
        }
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, handleIndex: number): void => {
      if (disabled) return;

      let delta = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        delta = step;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        delta = -step;
      } else if (e.key === "PageUp") {
        delta = step * 10;
      } else if (e.key === "PageDown") {
        delta = -step * 10;
      } else {
        return;
      }

      e.preventDefault();

      const currentHandleVal = normalizedValues[handleIndex];
      const nextHandleVal = clamp(currentHandleVal + delta, min, max);

      let nextValue: number | [number, number];
      if (range) {
        const newTuple: [number, number] = [...normalizedValues] as [number, number];
        if (handleIndex === 0) {
          newTuple[0] = Math.min(nextHandleVal, newTuple[1]);
        } else {
          newTuple[1] = Math.max(nextHandleVal, newTuple[0]);
        }
        nextValue = newTuple;
      } else {
        nextValue = nextHandleVal;
      }

      if (controlledValue === undefined) {
        setInternalValue(nextValue);
      }
      if (onChange) {
        onChange(nextValue);
      }
      if (onAfterChange) {
        onAfterChange(nextValue);
      }
    };

    // Calculate highlighted track segment
    const startPercent = range ? getPercentage(normalizedValues[0]) : 0;
    const endPercent = range
      ? getPercentage(normalizedValues[1])
      : getPercentage(normalizedValues[0]);

    const trackHighlightStyle = vertical
      ? {
          bottom: `${startPercent}%`,
          height: `${endPercent - startPercent}%`,
        }
      : {
          left: `${startPercent}%`,
          width: `${endPercent - startPercent}%`,
        };

    const showTooltip = Boolean(tooltip);
    const tooltipConfig: CDSliderTooltipConfig =
      typeof tooltip === "object" ? tooltip : {};

    const renderHandle = (index: number): ReactElement => {
      const val = normalizedValues[index];
      const pct = getPercentage(val);
      const isDragging = activeDraggingHandle === index;

      const handlePosStyle = vertical
        ? { bottom: `${pct}%`, left: "50%", transform: "translate(-50%, 50%)" }
        : { left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)" };

      const formattedVal = tooltipConfig.formatter
        ? tooltipConfig.formatter(val)
        : val;

      return (
        <div
          key={index}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-orientation={vertical ? "vertical" : "horizontal"}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPointerDown={(e) => {
            e.stopPropagation();
            handlePointerDown(e, index);
          }}
          style={handlePosStyle}
          className={cn(
            "cinder-slider-handle",
            isDragging && "cinder-slider-handle-active"
          )}
        >
          {showTooltip && (
            <div
              className={cn(
                "cinder-slider-tooltip",
                (isDragging || tooltipConfig.open) && "cinder-slider-tooltip-visible"
              )}
            >
              {formattedVal}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "cinder-slider",
          vertical ? "cinder-slider-vertical" : "cinder-slider-horizontal",
          disabled && "cinder-slider-disabled",
          className
        )}
        {...restProps}
      >
        <div
          ref={trackRef}
          className="cinder-slider-rail"
          onPointerDown={(e) => handlePointerDown(e)}
        >
          {/* Highlighted Fill Bar */}
          <div className="cinder-slider-track" style={trackHighlightStyle} />

          {/* Optional Discrete Step Dots */}
          {dots && step > 0 && max > min && (
            <div className="cinder-slider-dots">
              {Array.from({ length: Math.floor((max - min) / step) + 1 }).map(
                (_, idx) => {
                  const dotVal = min + idx * step;
                  const dotPct = getPercentage(dotVal);
                  const isFilled =
                    dotPct >= startPercent && dotPct <= endPercent;
                  const dotStyle = vertical
                    ? { bottom: `${dotPct}%` }
                    : { left: `${dotPct}%` };

                  return (
                    <span
                      key={idx}
                      style={dotStyle}
                      className={cn(
                        "cinder-slider-dot",
                        isFilled && "cinder-slider-dot-active"
                      )}
                    />
                  );
                }
              )}
            </div>
          )}

          {/* Handles */}
          {range ? (
            <>
              {renderHandle(0)}
              {renderHandle(1)}
            </>
          ) : (
            renderHandle(0)
          )}
        </div>

        {/* Custom Marks & Labels */}
        {marks && (
          <div className="cinder-slider-marks">
            {Object.entries(marks as CDSliderMarks).map(([rawPoint, markItem]) => {
              const point = Number(rawPoint);
              const pct = getPercentage(point);
              const isMarkActive = pct >= startPercent && pct <= endPercent;

              const markStyle = vertical
                ? { bottom: `${pct}%`, transform: "translateY(50%)" }
                : { left: `${pct}%`, transform: "translateX(-50%)" };

              const label =
                typeof markItem === "object" &&
                markItem !== null &&
                "label" in markItem
                  ? (markItem as { label: ReactNode }).label
                  : markItem;

              return (
                <span
                  key={point}
                  style={markStyle}
                  className={cn(
                    "cinder-slider-mark-text",
                    isMarkActive && "cinder-slider-mark-text-active"
                  )}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

CDSlider.displayName = "CDSlider";

export const Slider = CDSlider;
export const CDRangeSlider = CDSlider;
export const RangeSlider = CDSlider;
