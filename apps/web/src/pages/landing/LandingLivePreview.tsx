import { useState, type ReactElement, type ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Input,
  Switch,
  Slider,
  Progress,
  Tag,
  Avatar,
  AvatarGroup,
} from "@tec-triad/cinder-ui";
import {
  ShieldCheck,
  Zap,
  RotateCw,
  Search,
  CheckCircle2,
  Sliders,
  Code2,
  Cpu,
} from "lucide-react";

export function LandingLivePreview(): ReactElement {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bandwidth, setBandwidth] = useState<number>(68);
  const [wafProtection, setWafProtection] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("production-cluster-01");

  const handleSimulateDeploy = (): void => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1200);
  };

  const getStatusBadge = (): ReactElement => {
    if (bandwidth >= 85) {
      return <Badge variant="danger" size="sm" dot>Heavy Load {bandwidth}%</Badge>;
    }
    if (bandwidth >= 60) {
      return <Badge variant="primary" size="sm" dot>Optimal {bandwidth}%</Badge>;
    }
    return <Badge variant="success" size="sm" dot>Idle {bandwidth}%</Badge>;
  };

  const sampleSnippet = `<Card variant="glass" interactive>
  <CardHeader>
    <Badge variant="primary" dot>Production Active</Badge>
    <CardTitle>Cloud Gateway Node</CardTitle>
  </CardHeader>
  <CardContent>
    <Slider value={${bandwidth}} onChange={setBandwidth} />
    <Progress value={${bandwidth}} variant="primary" />
    <Switch checked={${wafProtection}} onChange={setWafProtection} label="WAF Guard" />
    <Button variant="primary" loading={${isLoading}}>Deploy Cluster</Button>
  </CardContent>
</Card>`;

  return (
    <section className="section live-preview-section" aria-labelledby="live-preview-heading">
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <Badge variant="primary" size="md">
              Living Component Architecture
            </Badge>
          </div>
          <h2 id="live-preview-heading" className="section-title">
            Interactive Component Deck
          </h2>
          <p className="section-desc">
            Test real Cinder primitives live. Every element demonstrates atomic design tokens,
            keyboard accessibility, fluid micro-interactions, and mobile ergonomics.
          </p>
        </div>

        {/* The Live Playground Card */}
        <div className="preview-deck-wrapper">
          <Card variant="surface" className="preview-deck-card">
            {/* Top Deck Navigation */}
            <div className="preview-deck-header">
              <div className="preview-deck-title-group">
                <div className="preview-deck-indicator" aria-hidden="true">
                  <span className="preview-deck-dot" />
                  <span className="preview-deck-dot" />
                  <span className="preview-deck-dot" />
                </div>
                <span className="preview-deck-name">Node Controller // us-east-1</span>
                {getStatusBadge()}
              </div>

              {/* View Switcher: Interactive UI vs JSX Code */}
              <div className="preview-tab-controls" role="tablist" aria-label="Deck display mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "preview"}
                  className={`preview-tab-btn ${activeTab === "preview" ? "preview-tab-btn-active" : ""}`}
                  onClick={() => setActiveTab("preview")}
                >
                  <Sliders size={13} aria-hidden="true" />
                  <span>Interactive UI</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "code"}
                  className={`preview-tab-btn ${activeTab === "code" ? "preview-tab-btn-active" : ""}`}
                  onClick={() => setActiveTab("code")}
                >
                  <Code2 size={13} aria-hidden="true" />
                  <span>JSX Source</span>
                </button>
              </div>
            </div>

            {/* Deck Body */}
            <CardContent className="preview-deck-content">
              {activeTab === "preview" ? (
                <div className="preview-interactive-grid">
                  {/* Left Column: Form Controls & Sliders */}
                  <div className="preview-deck-column">
                    <div className="preview-control-group">
                      <div className="preview-label-row">
                        <label htmlFor="preview-cluster-input" className="preview-control-label">
                          Cluster Identifier
                        </label>
                        <Tag variant="primary" size="sm">Active VPC</Tag>
                      </div>
                      <Input
                        id="preview-cluster-input"
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        prefix={<Search size={14} aria-hidden="true" />}
                        placeholder="Search or enter node name..."
                      />
                    </div>

                    <div className="preview-control-group">
                      <div className="preview-label-row">
                        <span className="preview-control-label">Throughput Capacity</span>
                        <span className="preview-control-val">{bandwidth}% Allocated</span>
                      </div>
                      <Slider
                        value={bandwidth}
                        min={10}
                        max={100}
                        step={1}
                        onChange={(val: number | [number, number]) => {
                          setBandwidth(typeof val === "number" ? val : val[0]);
                        }}
                        aria-label="Throughput capacity percentage"
                      />
                      <Progress
                        value={bandwidth}
                        status={bandwidth >= 85 ? "danger" : "active"}
                        size="sm"
                        aria-label="Real-time capacity progress"
                      />
                    </div>

                    <div
                      className="preview-control-group preview-toggle-row"
                      onClick={() => setWafProtection(!wafProtection)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setWafProtection(!wafProtection);
                        }
                      }}
                      aria-label="Toggle Shield WAF Protection"
                    >
                      <div className="preview-toggle-info">
                        <div className="preview-toggle-title">
                          <ShieldCheck size={16} color="var(--cinder-primary)" aria-hidden="true" />
                          <span>Shield WAF Protection</span>
                          <Badge variant={wafProtection ? "primary" : "default"} size="sm">
                            {wafProtection ? "Active" : "Disabled"}
                          </Badge>
                        </div>
                        <span className="preview-toggle-desc">
                          Autonomous mitigation of DDoS attack vectors.
                        </span>
                      </div>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
                      >
                        <Switch
                          checked={wafProtection}
                          onChange={(checked: boolean) => setWafProtection(checked)}
                          aria-label="Toggle shield WAF protection"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Action State & Avatars */}
                  <div className="preview-deck-column preview-deck-column-alt">
                    <div className="preview-status-box">
                      <div className="preview-status-header">
                        <Cpu size={16} color="var(--cinder-primary)" aria-hidden="true" />
                        <span className="preview-status-title">Runtime State</span>
                      </div>
                      <div className="preview-status-stats">
                        <div className="preview-stat-item">
                          <span className="preview-stat-num">99.98%</span>
                          <span className="preview-stat-lbl">Uptime SLA</span>
                        </div>
                        <div className="preview-stat-item">
                          <span className="preview-stat-num">4.2ms</span>
                          <span className="preview-stat-lbl">P99 Latency</span>
                        </div>
                        <div className="preview-stat-item">
                          <span className="preview-stat-num">12 Nodes</span>
                          <span className="preview-stat-lbl">Replica Set</span>
                        </div>
                      </div>
                    </div>

                    <div className="preview-control-group">
                      <div className="preview-label-row">
                        <span className="preview-control-label">Team Access</span>
                        <span className="preview-control-val">4 Engineers</span>
                      </div>
                      <div className="preview-avatar-row">
                        <AvatarGroup maxCount={4}>
                          <Avatar size="md">AP</Avatar>
                          <Avatar size="md">TS</Avatar>
                          <Avatar size="md">RK</Avatar>
                          <Avatar size="md">EL</Avatar>
                        </AvatarGroup>
                        <Tag variant="success" size="sm">Synchronized</Tag>
                      </div>
                    </div>

                    <div className="preview-actions-row">
                      <Button
                        variant={isSuccess ? "accent" : "primary"}
                        size="md"
                        isLoading={isLoading}
                        onClick={handleSimulateDeploy}
                        leftIcon={
                          isSuccess ? (
                            <CheckCircle2 size={16} color="var(--cinder-success)" aria-hidden="true" />
                          ) : (
                            <Zap size={16} aria-hidden="true" />
                          )
                        }
                      >
                        {isLoading
                          ? "Deploying Nodes..."
                          : isSuccess
                            ? "Cluster Deployed"
                            : "Simulate Live Deploy"}
                      </Button>

                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setBandwidth(50);
                          setWafProtection(true);
                          setSearchQuery("production-cluster-01");
                        }}
                        leftIcon={<RotateCw size={14} aria-hidden="true" />}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preview-code-viewport">
                  <pre className="preview-code-block">
                    <code>{sampleSnippet}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
