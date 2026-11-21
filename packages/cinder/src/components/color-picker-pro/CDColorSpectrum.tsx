import {
  useRef,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { HSVA, RGBA } from "./colorUtils";
import { hsvaToRgba, rgbaToHex } from "./colorUtils";

interface CDColorSpectrumProps {
  hsva: HSVA;
  onChange: (hsva: HSVA) => void;
  showAlpha?: boolean;
}

export function CDColorSpectrum({
  hsva,
  onChange,
  showAlpha = true,
}: CDColorSpectrumProps): ReactElement {
  const satRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);

  // Pure hue background color for saturation box
  const pureHueRgba: RGBA = hsvaToRgba({ h: hsva.h, s: 1, v: 1, a: 1 });
  const pureHueHex: string = rgbaToHex(pureHueRgba);

  const handleSatMouseDown = (e: ReactMouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const target = satRef.current;
    if (!target) return;

    const updateSatVal = (event: MouseEvent): void => {
      const rect = target.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

      const s = Math.round((x / rect.width) * 100) / 100;
      const v = Math.round((1 - y / rect.height) * 100) / 100;

      onChange({ ...hsva, s, v });
    };

    updateSatVal(e.nativeEvent);

    const onMouseMove = (event: MouseEvent): void => updateSatVal(event);
    const onMouseUp = (): void => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleHueMouseDown = (e: ReactMouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const target = hueRef.current;
    if (!target) return;

    const updateHue = (event: MouseEvent): void => {
      const rect = target.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const h = Math.round((x / rect.width) * 360);
      onChange({ ...hsva, h: Math.min(h, 359) });
    };

    updateHue(e.nativeEvent);

    const onMouseMove = (event: MouseEvent): void => updateHue(event);
    const onMouseUp = (): void => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleAlphaMouseDown = (e: ReactMouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const target = alphaRef.current;
    if (!target) return;

    const updateAlpha = (event: MouseEvent): void => {
      const rect = target.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const a = Math.round((x / rect.width) * 100) / 100;
      onChange({ ...hsva, a });
    };

    updateAlpha(e.nativeEvent);

    const onMouseMove = (event: MouseEvent): void => updateAlpha(event);
    const onMouseUp = (): void => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="cinder-color-spectrum-wrapper">
      {/* 2D Saturation / Value Box */}
      <div
        ref={satRef}
        className="cinder-color-sat-box"
        style={{ backgroundColor: pureHueHex }}
        onMouseDown={handleSatMouseDown}
      >
        <div className="cinder-color-sat-white" />
        <div className="cinder-color-sat-black" />
        <div
          className="cinder-color-sat-pointer"
          style={{
            left: `${hsva.s * 100}%`,
            top: `${(1 - hsva.v) * 100}%`,
          }}
        />
      </div>

      {/* Sliders Container */}
      <div className="cinder-color-sliders">
        {/* Hue Slider */}
        <div
          ref={hueRef}
          className="cinder-color-slider-track cinder-color-hue-track"
          onMouseDown={handleHueMouseDown}
        >
          <div
            className="cinder-color-slider-thumb"
            style={{ left: `${(hsva.h / 360) * 100}%` }}
          />
        </div>

        {/* Alpha Slider */}
        {showAlpha && (
          <div
            ref={alphaRef}
            className="cinder-color-slider-track cinder-color-alpha-track"
            onMouseDown={handleAlphaMouseDown}
          >
            <div
              className="cinder-color-alpha-fill"
              style={{
                background: `linear-gradient(to right, transparent, ${pureHueHex})`,
              }}
            />
            <div
              className="cinder-color-slider-thumb"
              style={{ left: `${hsva.a * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
