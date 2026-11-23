import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "@tec-triad/cinder-ui";
import { Copy, Check, ArrowRight } from "lucide-react";
import type { TokenItem } from "./types";

const TOKENS: readonly TokenItem[] = [
  { name: "--cinder-bg", darkValue: "#09090b", lightValue: "#fafafa", role: "Canvas Background" },
  { name: "--cinder-surface", darkValue: "#121215", lightValue: "#ffffff", role: "Card & Elevated Surface" },
  { name: "--cinder-surface-hover", darkValue: "#1a1a1f", lightValue: "#f4f4f5", role: "Interactive Hover" },
  { name: "--cinder-border", darkValue: "#27272a", lightValue: "#e4e4e7", role: "Subtle Structural Border" },
  { name: "--cinder-primary", darkValue: "#3b82f6", lightValue: "#2563eb", role: "Primary Royal Blue Action" },
  { name: "--cinder-primary-hover", darkValue: "#2563eb", lightValue: "#1d4ed8", role: "Primary Hover State" },
  { name: "--cinder-text", darkValue: "#fafafa", lightValue: "#09090b", role: "High-Contrast Foreground" },
  { name: "--cinder-muted", darkValue: "#a1a1aa", lightValue: "#71717a", role: "Secondary Subtext" },
];

export function LandingTokensSection(): ReactElement {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = async (tokenName: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`var(${tokenName})`);
      setCopiedToken(tokenName);
      setTimeout(() => setCopiedToken(null), 1800);
    } catch {
      setCopiedToken(null);
    }
  };

  return (
    <section className="section tokens-section" aria-labelledby="tokens-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="primary" size="md">
              Cinder Slate Tokens
            </Badge>
          </div>
          <h2 id="tokens-heading" className="section-title">
            Token-Driven Semantic Harmony
          </h2>
          <p className="section-desc">
            Engineered with strict zero-glare obsidian values and high-readability light modes.
            Every component is 100% tokenized for effortless theme branding.
          </p>
        </div>

        {/* Tokens Table Card */}
        <Card variant="surface" className="tokens-showcase-card">
          <div className="tokens-table-responsive" tabIndex={0} role="region" aria-label="Cinder Slate Tokens Table">
            <table className="token-table">
              <thead>
                <tr>
                  <th scope="col">Token Variable</th>
                  <th scope="col">Semantic Role</th>
                  <th scope="col">Dark Mode</th>
                  <th scope="col">Light Mode</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((token: TokenItem) => {
                  const isCopied: boolean = copiedToken === token.name;
                  return (
                    <tr key={token.name}>
                      <td>
                        <code className="token-name">{token.name}</code>
                      </td>
                      <td>
                        <span className="token-role">{token.role}</span>
                      </td>
                      <td>
                        <div className="token-cell-color">
                          <span
                            className="token-chip"
                            style={{ backgroundColor: token.darkValue }}
                            aria-hidden="true"
                          />
                          <code className="token-val-text">{token.darkValue}</code>
                        </div>
                      </td>
                      <td>
                        <div className="token-cell-color">
                          <span
                            className="token-chip"
                            style={{ backgroundColor: token.lightValue }}
                            aria-hidden="true"
                          />
                          <code className="token-val-text">{token.lightValue}</code>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="token-copy-btn"
                          onClick={() => handleCopy(token.name)}
                          aria-label={`Copy CSS variable ${token.name}`}
                          title="Copy CSS variable"
                        >
                          {isCopied ? (
                            <Check size={14} color="var(--cinder-success)" aria-hidden="true" />
                          ) : (
                            <Copy size={14} aria-hidden="true" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="tokens-card-footer">
            <span className="tokens-footer-note">
              Click any token row to copy the CSS variable syntax.
            </span>
            <Button
              as={Link}
              to="/tokens"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight size={14} aria-hidden="true" />}
            >
              Explore Full Token Reference
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
