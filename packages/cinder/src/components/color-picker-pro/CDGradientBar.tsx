import {
  useRef,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { CDGradientStop, CDGradientValue } from "./types";
import { buildGradientCss } from "./colorUtils";

interface CDGradientBarProps {
  gradient: CDGradientValue;
  activeStopId: string;
  onSelectStop: (id: string) => void;
  onUpdateGradient: (grad: CDGradientValue) => void;
}

export function CDGradientBar({
  gradient,
  activeStopId,
  onSelectStop,
  onUpdateGradient,
}: CDGradientBarProps): ReactElement {
  const barRef = useRef<HTMLDivElement>(null);
  const cssBackground: string = buildGradientCss(gradient);

  const handleBarClick = (e: ReactMouseEvent<HTMLDivElement>): void => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const offset = Math.round((x / rect.width) * 100);

    // Add new stop
    const newStop: CDGradientStop = {
      id: `stop-${Date.now()}`,
      color: "#3b82f6",
      offset,
    };
    onUpdateGradient({
      ...gradient,
      stops: [...gradient.stops, newStop],
    });
    onSelectStop(newStop.id);
  };

  const handleStopMouseDown = (e: ReactMouseEvent<HTMLDivElement>, stopId: string): void => {
    e.stopPropagation();
    onSelectStop(stopId);

    const bar = barRef.current;
    if (!bar) return;

    const onMouseMove = (event: MouseEvent): void => {
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const offset = Math.round((x / rect.width) * 100);

      onUpdateGradient({
        ...gradient,
        stops: gradient.stops.map((s: CDGradientStop) =>
          s.id === stopId ? { ...s, offset } : s
        ),
      });
    };

    const onMouseUp = (): void => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleRemoveStop = (e: ReactMouseEvent, stopId: string): void => {
    e.stopPropagation();
    if (gradient.stops.length <= 2) return; // Keep minimum 2 stops
    const updated = gradient.stops.filter((s: CDGradientStop) => s.id !== stopId);
    onUpdateGradient({ ...gradient, stops: updated });
    if (activeStopId === stopId) {
      onSelectStop(updated[0].id);
    }
  };

  return (
    <div className="cinder-gradient-control-group">
      <div className="cinder-gradient-type-row">
        <div className="cinder-gradient-types">
          <button
            type="button"
            className={`cinder-grad-type-btn ${gradient.type === "linear" ? "active" : ""}`}
            onClick={() => onUpdateGradient({ ...gradient, type: "linear" })}
          >
            Linear
          </button>
          <button
            type="button"
            className={`cinder-grad-type-btn ${gradient.type === "radial" ? "active" : ""}`}
            onClick={() => onUpdateGradient({ ...gradient, type: "radial" })}
          >
            Radial
          </button>
        </div>

        {gradient.type === "linear" && (
          <div className="cinder-gradient-angle">
            <input
              type="number"
              min={0}
              max={360}
              value={gradient.angle}
              onChange={(e) =>
                onUpdateGradient({ ...gradient, angle: Number(e.target.value) || 0 })
              }
              className="cinder-grad-angle-input"
            />
            <span className="cinder-grad-deg">&deg;</span>
          </div>
        )}
      </div>

      {/* Gradient Interactive Track */}
      <div
        ref={barRef}
        className="cinder-gradient-track"
        style={{ background: cssBackground }}
        onClick={handleBarClick}
      >
        {gradient.stops.map((stop: CDGradientStop) => {
          const isActive: boolean = stop.id === activeStopId;
          return (
            <div
              key={stop.id}
              className={`cinder-gradient-stop ${isActive ? "active" : ""}`}
              style={{ left: `${stop.offset}%` }}
              onMouseDown={(e) => handleStopMouseDown(e, stop.id)}
            >
              <div
                className="cinder-gradient-stop-inner"
                style={{ backgroundColor: stop.color }}
              />
              {isActive && gradient.stops.length > 2 && (
                <button
                  type="button"
                  className="cinder-gradient-stop-delete"
                  onClick={(e) => handleRemoveStop(e, stop.id)}
                  title="Remove Stop"
                >
                  &times;
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
