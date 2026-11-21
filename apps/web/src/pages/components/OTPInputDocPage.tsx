import { useState, type ReactElement } from "react";
import {
  CDOTPInput,
  Badge,
  Button,
  generateOTP,
  type CDOTPType,
  type CDOTPRadius,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function OTPInputDocPage(): ReactElement {
  // Playground interactive state
  const [playgroundLength, setPlaygroundLength] = useState<number>(4);
  const [playgroundType, setPlaygroundType] = useState<CDOTPType>("numeric");
  const [playgroundRadius, setPlaygroundRadius] = useState<CDOTPRadius>("md");
  const [dynamicOtpValue, setDynamicOtpValue] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>(() =>
    generateOTP({ length: 4, type: "numeric" }),
  );
  const [playgroundCompleted, setPlaygroundCompleted] = useState<string>("");

  // Standalone demo states
  const [fourDigitCode, setFourDigitCode] = useState<string>("");
  const [alphaNumCode, setAlphaNumCode] = useState<string>("");

  const handleGenerateNew = (): void => {
    const freshCode: string = generateOTP({
      length: playgroundLength,
      type: playgroundType,
    });
    setGeneratedCode(freshCode);
    setDynamicOtpValue("");
    setPlaygroundCompleted("");
  };

  const handleSimulateFill = (): void => {
    setDynamicOtpValue(generatedCode);
    setPlaygroundCompleted(generatedCode);
  };

  const handleLengthChange = (newLen: number): void => {
    setPlaygroundLength(newLen);
    const fresh: string = generateOTP({ length: newLen, type: playgroundType });
    setGeneratedCode(fresh);
    setDynamicOtpValue("");
    setPlaygroundCompleted("");
  };

  const handleTypeChange = (newType: CDOTPType): void => {
    setPlaygroundType(newType);
    const fresh: string = generateOTP({ length: playgroundLength, type: newType });
    setGeneratedCode(fresh);
    setDynamicOtpValue("");
    setPlaygroundCompleted("");
  };

  const apiProps = [
    { property: "length", description: "Number of verification code digit slots (supports 4, 6, 8, etc.)", type: "number", default: "6" },
    { property: "type", description: "Input character validation: 'numeric' (number alone), 'alphanumeric' (word and number), or 'alpha' (word alone)", type: "'numeric' | 'alphanumeric' | 'alpha'", default: "'numeric'" },
    { property: "radius", description: "Adjusts the corner curve of the box ('none' | 'sm' | 'md' | 'lg' | 'full' or custom px/number)", type: "CDOTPRadius", default: "'md'" },
    { property: "size", description: "Slot box dimension ('sm' | 'md' | 'lg')", type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { property: "value", description: "Controlled combined string value for dynamic OTP autofill", type: "string", default: "undefined" },
    { property: "defaultValue", description: "Default initial value for uncontrolled usage", type: "string", default: "''" },
    { property: "onChange", description: "Callback fired whenever any slot value changes", type: "(val: string) => void", default: "-" },
    { property: "onComplete", description: "Callback fired automatically when all slots are filled", type: "(code: string) => void", default: "-" },
    { property: "masked", description: "Hide digits with dot mask like a password input", type: "boolean", default: "false" },
    { property: "showMaskToggle", description: "Show toggle button to reveal or mask digits", type: "boolean", default: "false" },
    { property: "grouped", description: "Insert visual hyphen divider in the center (e.g. 2-2 for 4 digits, 3-3 for 6 digits)", type: "boolean", default: "true for length >= 6" },
    { property: "autoFocus", description: "Focus first slot on mount", type: "boolean", default: "false" },
    { property: "disabled", description: "Disable all slot inputs", type: "boolean", default: "false" },
    { property: "error", description: "Apply error border and color highlight", type: "boolean", default: "false" },
    { property: "helperText", description: "Helper instruction or error text below slots", type: "string", default: "-" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">OTPInput</h1>
        <p className="cinder-doc-lead">
          High-performance one-time verification input with 4-digit and 6-digit layouts, customizable box curves, numeric or alphanumeric character modes, and dynamic code generation.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDOTPInput, generateOTP &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>4-Digit Mobile SMS &amp; PIN Codes</strong>: Quick verification for banking transactions, ATM card activations, and short authentication codes.</li>
          <li><strong>Two-Factor Authentication (2FA)</strong>: Entering standard 6-digit TOTP tokens from Google Authenticator, Authy, or 1Password.</li>
          <li><strong>Alphanumeric Security Vouchers</strong>: Mixed letters and numbers for gift vouchers, password reset tokens, and device pairing codes.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Live Demonstration</h2>

        <div className="cinder-demos-grid">
          {/* Dynamic OTP Generator & Box Curve Customizer */}
          <DemoCard
            title="Dynamic OTP Generator &amp; Box Curve Customizer"
            description="Toggle between 4 and 6 digits, choose number-alone or word-and-number modes, adjust the box corner curve, and simulate dynamic OTP generation."
            code={`import { useState } from 'react';
import { CDOTPInput, generateOTP, Button } from '@cinder-ui/core';

export default () => {
  const [value, setValue] = useState('');
  const [generated, setGenerated] = useState(() => generateOTP({ length: 4, type: 'numeric' }));

  return (
    <div>
      <CDOTPInput
        length={4}
        type="numeric"
        radius="lg"
        value={value}
        onChange={setValue}
        onComplete={(code) => console.log('Verified:', code)}
      />
      <Button onClick={() => setGenerated(generateOTP({ length: 4, type: 'numeric' }))}>
        Generate Dynamic OTP
      </Button>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Interactive Controls Bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(128, 128, 128, 0.06)",
                  border: "1px solid var(--cinder-border, #27272a)",
                }}
              >
                {/* Digit count */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>Digits:</span>
                  {[4, 6].map((len: number) => (
                    <Button
                      key={len}
                      size="sm"
                      variant={playgroundLength === len ? "primary" : "secondary"}
                      onClick={(): void => handleLengthChange(len)}
                    >
                      {len} Digits
                    </Button>
                  ))}
                </div>

                {/* Mode: Number Alone vs Word & Number */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>Mode:</span>
                  {(
                    [
                      { id: "numeric", label: "Number Alone" },
                      { id: "alphanumeric", label: "Word & Number" },
                    ] as Array<{ id: CDOTPType; label: string }>
                  ).map((m) => (
                    <Button
                      key={m.id}
                      size="sm"
                      variant={playgroundType === m.id ? "primary" : "secondary"}
                      onClick={(): void => handleTypeChange(m.id)}
                    >
                      {m.label}
                    </Button>
                  ))}
                </div>

                {/* Box Curve / Radius */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>Box Curve:</span>
                  {(
                    [
                      { id: "none", label: "Sharp" },
                      { id: "sm", label: "4px" },
                      { id: "md", label: "8px" },
                      { id: "lg", label: "14px" },
                      { id: "full", label: "Pill" },
                    ] as Array<{ id: CDOTPRadius; label: string }>
                  ).map((r) => (
                    <Button
                      key={r.label}
                      size="sm"
                      variant={playgroundRadius === r.id ? "primary" : "secondary"}
                      onClick={(): void => setPlaygroundRadius(r.id)}
                    >
                      {r.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dynamic Generator Trigger */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "var(--cinder-text-muted, #71717a)" }}>
                    Dynamic Code:
                  </span>
                  <Badge variant="primary">
                    <span style={{ fontFamily: "monospace", letterSpacing: "2px", fontWeight: 700 }}>
                      {generatedCode}
                    </span>
                  </Badge>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <Button size="sm" variant="secondary" onClick={handleGenerateNew}>
                    Generate New OTP
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleSimulateFill}>
                    Simulate Auto-Fill
                  </Button>
                </div>
              </div>

              {/* Live Rendered OTP Component */}
              <CDOTPInput
                label={`Enter ${playgroundLength}-Digit Verification Code`}
                length={playgroundLength}
                type={playgroundType}
                radius={playgroundRadius}
                value={dynamicOtpValue}
                onChange={(val: string): void => setDynamicOtpValue(val)}
                onComplete={(code: string): void => setPlaygroundCompleted(code)}
                helperText={
                  playgroundType === "numeric"
                    ? "Numeric only (0-9). Numbers alone are accepted."
                    : "Alphanumeric mode: letters (A-Z) and numbers (0-9) are accepted."
                }
              />

              {playgroundCompleted && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge variant="success" dot>Code Verified</Badge>
                  <code style={{ fontSize: "13px", fontWeight: 600 }}>{playgroundCompleted}</code>
                </div>
              )}
            </div>
          </DemoCard>

          {/* 4-Digit Numeric Security Code */}
          <DemoCard
            title="4-Digit Verification Code (Number Alone)"
            description="Four verification slots formatted for SMS and banking confirmations, customized with a smooth 14px rounded box curve."
            code={`import { CDOTPInput } from '@cinder-ui/core';

export default () => (
  <CDOTPInput
    label="Quick SMS Verification"
    length={4}
    type="numeric"
    radius="lg"
    grouped={false}
    helperText="Enter the 4-digit security code sent to your phone."
    onComplete={(code) => console.log('4-Digit Code:', code)}
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDOTPInput
                label="Quick SMS Verification"
                length={4}
                type="numeric"
                radius="lg"
                grouped={false}
                helperText="Enter the 4-digit security code sent to your phone."
                onComplete={(code: string): void => setFourDigitCode(code)}
              />
              {fourDigitCode && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge variant="success" dot>4-Digit Verified</Badge>
                  <code style={{ fontSize: "13px" }}>{fourDigitCode}</code>
                </div>
              )}
            </div>
          </DemoCard>

          {/* Alphanumeric Code (Word and Number) */}
          <DemoCard
            title="Alphanumeric Code (Word and Number)"
            description="Verification inputs accepting both letters and numbers, automatically capitalized for seamless voucher and secret key entry."
            code={`import { CDOTPInput } from '@cinder-ui/core';

export default () => (
  <CDOTPInput
    label="Voucher Activation Code"
    length={6}
    type="alphanumeric"
    radius="md"
    showMaskToggle={true}
    helperText="Accepts words and numbers (e.g. 7K2M9B)."
    onComplete={(code) => console.log('Alphanumeric:', code)}
  />
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CDOTPInput
                label="Voucher Activation Code"
                length={6}
                type="alphanumeric"
                radius="md"
                showMaskToggle={true}
                helperText="Accepts words and numbers (e.g. 7K2M9B)."
                onComplete={(code: string): void => setAlphaNumCode(code)}
              />
              {alphaNumCode && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge variant="success" dot>Alphanumeric Verified</Badge>
                  <code style={{ fontSize: "13px" }}>{alphaNumCode}</code>
                </div>
              )}
            </div>
          </DemoCard>

          {/* Box Curve Gallery */}
          <DemoCard
            title="Box Curve (Corner Radius) Gallery"
            description="Adjust the visual curve of the verification box to suit your design system: Sharp (0px), Small (4px), Standard (8px), Rounded (14px), and Full Pill (circle)."
            code={`import { CDOTPInput } from '@cinder-ui/core';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <CDOTPInput length={4} radius="none" label="Sharp (0px)" defaultValue="1234" />
    <CDOTPInput length={4} radius="sm" label="Small Curve (4px)" defaultValue="2345" />
    <CDOTPInput length={4} radius="md" label="Default Curve (8px)" defaultValue="3456" />
    <CDOTPInput length={4} radius="lg" label="Smooth Curve (14px)" defaultValue="4567" />
    <CDOTPInput length={4} radius="full" label="Full Pill Curve (9999px)" defaultValue="5678" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <CDOTPInput length={4} radius="none" label="Sharp (0px)" defaultValue="1234" />
              <CDOTPInput length={4} radius="sm" label="Small Curve (4px)" defaultValue="2345" />
              <CDOTPInput length={4} radius="md" label="Default Curve (8px)" defaultValue="3456" />
              <CDOTPInput length={4} radius="lg" label="Smooth Curve (14px)" defaultValue="4567" />
              <CDOTPInput length={4} radius="full" label="Full Pill Curve (9999px)" defaultValue="5678" />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification</h2>
        <ApiTable data={apiProps} />
      </section>
    </div>
  );
}

