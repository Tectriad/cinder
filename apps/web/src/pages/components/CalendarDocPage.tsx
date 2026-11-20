import { useState, type ReactElement } from "react";
import {
  CDCalendar,
  CDOutlookCalendar,
  CDBadge,
  CDTag,
  CDButton,
  type CDCalendarEvent,
  type CDOutlookCalendarView,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable, type ApiPropItem } from "../../components/ApiTable";

export function CalendarDocPage(): ReactElement {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [outlookDate, setOutlookDate] = useState<Date>(new Date());
  const [outlookView, setOutlookView] = useState<CDOutlookCalendarView>("week");
  const [mode, setMode] = useState<"month" | "year">("month");
  const [customActionLog, setCustomActionLog] = useState<string | null>(null);

  // Generate dynamic sample events anchored to the current week
  const today: Date = new Date();
  const getEventTime = (dayOffset: number, startHour: number, startMin: number, durationMinutes: number): { startDate: Date; endDate: Date } => {
    const startDate: Date = new Date(today);
    startDate.setDate(today.getDate() + dayOffset);
    startDate.setHours(startHour, startMin, 0, 0);

    const endDate: Date = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
    return { startDate, endDate };
  };

  const [calendarEvents, setCalendarEvents] = useState<CDCalendarEvent[]>([
    {
      id: "evt-allday-1",
      title: "Global Multi-Region Cloud Maintenance",
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      allDay: true,
      variant: "warning",
      category: "Infra",
      location: "AWS us-east-1 & eu-west-1",
      description: "Automated hypervisor patch rotation across core cluster nodes.",
    },
    {
      id: "evt-1",
      title: "Platform Core Standup",
      ...getEventTime(0, 9, 0, 45),
      variant: "primary",
      category: "Engineering",
      location: "Huddle / Google Meet",
      description: "Daily synchronization on deployment pipeline velocity and sprint blockers.",
    },
    {
      id: "evt-2",
      title: "PostgreSQL Database Migration",
      ...getEventTime(0, 11, 30, 90),
      variant: "danger",
      category: "Database",
      location: "Staging Cluster us-east-1",
      description: "Applying zero-downtime schema migrations and partition re-indexing.",
    },
    {
      id: "evt-3",
      title: "Q4 System Architecture Review",
      ...getEventTime(0, 14, 0, 75),
      variant: "purple",
      category: "Architecture",
      location: "Conference Room 4B",
      description: "Reviewing microservices decomposition and vector caching benchmarks.",
    },
    {
      id: "evt-4",
      title: "Kubernetes 1.32 Canary Rollout",
      ...getEventTime(1, 10, 0, 90),
      variant: "cyan",
      category: "DevOps",
      location: "Production Cluster",
      description: "Canary routing 10% traffic to modern worker pools.",
    },
    {
      id: "evt-5",
      title: "Team Retrospective & Demo",
      ...getEventTime(-2, 13, 0, 60),
      variant: "success",
      category: "Sprint",
      location: "Virtual Meeting",
      description: "Demonstrating Cinder Slate components and collecting UX telemetry.",
    },
    {
      id: "evt-6",
      title: "SOC2 Security Compliance Audit",
      ...getEventTime(2, 15, 0, 90),
      variant: "orange",
      category: "Security",
      location: "Security Ops Room",
      description: "External auditor verification of KMS key rotation and IAM least-privilege.",
    },
  ]);

  const handleEventCreate = (newEvent: CDCalendarEvent): void => {
    setCalendarEvents((prev: CDCalendarEvent[]) => [...prev, newEvent]);
  };

  const handleEventDelete = (evt: CDCalendarEvent): void => {
    setCalendarEvents((prev: CDCalendarEvent[]) => prev.filter((item: CDCalendarEvent) => item.id !== evt.id));
  };

  // Minimal calendar badge render logic
  const getEventForDate = (date: Date): { text: string; variant: "success" | "primary" | "danger" | "warning" } | null => {
    const day: number = date.getDate();
    if (day === 8) return { text: "Release v1.2", variant: "success" };
    if (day === 15) return { text: "DB Migration", variant: "primary" };
    if (day === 22) return { text: "Security Audit", variant: "warning" };
    if (day === 28) return { text: "Failover Test", variant: "danger" };
    return null;
  };

  const outlookCalendarApi: ApiPropItem[] = [
    { property: "value", description: "Currently active date", type: "Date", default: "new Date()" },
    { property: "defaultValue", description: "Initial active date", type: "Date", default: "new Date()" },
    { property: "onChange", description: "Callback when the active date is navigated or selected", type: "(date: Date) => void", default: "-" },
    { property: "view", description: "Active view mode ('day' | 'week' | 'month' | 'year')", type: "'day' | 'week' | 'month' | 'year'", default: "'week'" },
    { property: "defaultView", description: "Initial view mode", type: "'day' | 'week' | 'month' | 'year'", default: "'week'" },
    { property: "onViewChange", description: "Callback triggered when view mode switches", type: "(view: 'day' | 'week' | 'month' | 'year') => void", default: "-" },
    { property: "events", description: "Collection of schedule events to display", type: "CDCalendarEvent[]", default: "[]" },
    { property: "allowFullscreen", description: "Show Zoom / Fullscreen toggle action button in the toolbar", type: "boolean", default: "true" },
    { property: "fullscreen", description: "Controlled fullscreen zoom mode state", type: "boolean", default: "false" },
    { property: "onFullscreenChange", description: "Callback triggered when fullscreen zoom mode is toggled", type: "(isFullscreen: boolean) => void", default: "-" },
    { property: "openModalOnClick", description: "Automatically open detail/create modal when clicking an event or empty slot", type: "boolean", default: "true" },
    { property: "renderEventModal", description: "Custom component renderer inside the event click modal dialog", type: "(event: CDCalendarEvent, onClose: () => void) => ReactNode", default: "-" },
    { property: "renderSlotModal", description: "Custom component renderer inside the slot click modal dialog", type: "(slot: { date: Date, hour: number }, onClose: () => void) => ReactNode", default: "-" },
    { property: "onEventCreate", description: "Callback triggered when a new event is saved from the modal", type: "(event: CDCalendarEvent) => void", default: "-" },
    { property: "onEventDelete", description: "Callback triggered when an event is deleted from the modal", type: "(event: CDCalendarEvent) => void", default: "-" },
    { property: "onEventClick", description: "Callback when clicking an event block or chip", type: "(event: CDCalendarEvent, e: MouseEvent) => void", default: "-" },
    { property: "onSlotClick", description: "Callback when clicking on an empty time slot", type: "(date: Date, hour: number) => void", default: "-" },
    { property: "startHour", description: "First hour rendered in Day/Week grid (0-23)", type: "number", default: "8" },
    { property: "endHour", description: "Last hour rendered in Day/Week grid (0-23)", type: "number", default: "20" },
    { property: "showCurrentTime", description: "Whether to render live current time indicator line", type: "boolean", default: "true" },
  ];

  const calendarEventApi: ApiPropItem[] = [
    { property: "id", description: "Unique event identifier", type: "string", default: "-" },
    { property: "title", description: "Event title text", type: "string", default: "-" },
    { property: "startDate", description: "Event starting timestamp", type: "Date", default: "-" },
    { property: "endDate", description: "Event ending timestamp", type: "Date", default: "-" },
    { property: "allDay", description: "Whether event spans the entire day banner", type: "boolean", default: "false" },
    { property: "variant", description: "Semantic color theme variant", type: "'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan' | 'orange'", default: "'primary'" },
    { property: "location", description: "Physical room or virtual link", type: "string", default: "-" },
    { property: "description", description: "Detailed agenda notes", type: "string", default: "-" },
    { property: "category", description: "Category tag label", type: "string", default: "-" },
  ];

  return (
    <div className="antd-doc-page">
      {/* Page Header */}
      <div className="antd-doc-header">
        <h1 className="antd-doc-title">CDCalendar / Outlook Scheduler</h1>
        <p className="antd-doc-lead">
          Full-featured Outlook scheduler supporting Day, Week, Month, and Year views, 24h/business-hours time grids,
          Zoom (Fullscreen) mode, and click-to-open modals with custom component injection.
        </p>

        <div className="antd-doc-import">
          <code>import &#123; CDOutlookCalendar, OutlookCalendar, CDCalendar, Calendar &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      {/* When To Use Section */}
      <section id="when-to-use" className="antd-doc-section">
        <h2 className="antd-section-heading">When To Use</h2>
        <ul className="antd-doc-list">
          <li>For scheduling visibility across Day, Week, Month, and Year calendar views.</li>
          <li>Click the <strong>Zoom</strong> button in the toolbar to expand the calendar into an immersive full-screen display.</li>
          <li>Click any event block to inspect details or trigger custom actions in an overlay modal.</li>
          <li>Pass custom dialog components via <code>renderEventModal</code> or <code>renderSlotModal</code> to embed custom forms or runbooks.</li>
        </ul>
      </section>

      {/* Examples Section */}
      <section id="examples" className="antd-doc-section">
        <h2 className="antd-section-heading">Examples</h2>

        <div className="antd-demos-grid">
          {/* Outlook Calendar with Zoom & Modal Support */}
          <DemoCard
            title="Outlook Scheduler with Zoom & Interactive Modal"
            description="Features a top Zoom button for full-screen mode. Clicking any event block or empty time slot opens an action modal."
            fullWidth
            code={`import { useState } from "react";
import { CDOutlookCalendar, type CDCalendarEvent } from "@cinder-ui/core";

export function OutlookExample() {
  const [events, setEvents] = useState<CDCalendarEvent[]>(sampleEvents);

  return (
    <CDOutlookCalendar
      events={events}
      allowFullscreen={true}
      openModalOnClick={true}
      onEventCreate={(newEvt) => setEvents((prev) => [...prev, newEvt])}
      onEventDelete={(evt) => setEvents((prev) => prev.filter((e) => e.id !== evt.id))}
    />
  );
}`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                Tip: Click <strong>Zoom</strong> in the toolbar to enter Fullscreen mode (press <code>Escape</code> or click Exit Zoom to return).
                Click any event or time slot to open the modal.
              </div>

              <CDOutlookCalendar
                value={outlookDate}
                onChange={(d: Date) => setOutlookDate(d)}
                view={outlookView}
                onViewChange={(v: CDOutlookCalendarView) => setOutlookView(v)}
                events={calendarEvents}
                allowFullscreen={true}
                openModalOnClick={true}
                onEventCreate={handleEventCreate}
                onEventDelete={handleEventDelete}
              />
            </div>
          </DemoCard>

          {/* Custom Component in Modal */}
          <DemoCard
            title="Custom Modal Component Injection (renderEventModal)"
            description="Developers can pass any custom React component into the modal dialog to embed custom action forms, runbooks, or triage workflows."
            fullWidth
            code={`<CDOutlookCalendar
  events={events}
  renderEventModal={(event, onClose) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3>Incident Response Runbook: {event.title}</h3>
      <p>Custom component rendered inside modal!</p>
      <CDButton variant="danger" onClick={onClose}>
        Escalate to On-Call P1
      </CDButton>
    </div>
  )}
/>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              {customActionLog && (
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  fontSize: "13px",
                  color: "var(--cinder-success)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span>{customActionLog}</span>
                  <CDButton size="sm" variant="ghost" onClick={() => setCustomActionLog(null)}>
                    Dismiss
                  </CDButton>
                </div>
              )}

              <CDOutlookCalendar
                events={calendarEvents}
                defaultView="day"
                allowFullscreen={false}
                renderEventModal={(event: CDCalendarEvent, onClose: () => void) => (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "8px 0" }}>
                    <div>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--cinder-text)" }}>
                        Operational Runbook: {event.title}
                      </span>
                      <div style={{ fontSize: "12px", color: "var(--cinder-muted)", marginTop: "4px" }}>
                        Assigned Tier: Tier-3 Production Engineering • Location: {event.location || "Cluster Virtual"}
                      </div>
                    </div>

                    <div style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      backgroundColor: "var(--cinder-surface-hover)",
                      border: "1px solid var(--cinder-border)",
                      fontSize: "13px",
                      color: "var(--cinder-text)",
                    }}>
                      This event has an attached automated canary deployment pipeline. Select an operational action below:
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <CDButton
                        size="sm"
                        variant="secondary"
                        onClick={(): void => {
                          setCustomActionLog(`Triggered canary verification for: ${event.title}`);
                          onClose();
                        }}
                      >
                        Run Health Check
                      </CDButton>
                      <CDButton
                        size="sm"
                        variant="primary"
                        onClick={(): void => {
                          setCustomActionLog(`Executed automated rollout for: ${event.title}`);
                          onClose();
                        }}
                      >
                        Approve Rollout
                      </CDButton>
                    </div>
                  </div>
                )}
              />
            </div>
          </DemoCard>

          {/* Minimal Calendar Widget */}
          <DemoCard
            title="Standalone Calendar with Event Badges"
            description="A lightweight calendar widget with month matrix and year grid views with custom cell marker renderers."
            fullWidth
            code={`<CDCalendar
  value={selectedDate}
  onChange={setSelectedDate}
  mode="month"
  dateCellRender={(d) => d.getDate() === 15 ? <CDBadge dot variant="primary">Release</CDBadge> : null}
/>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ fontSize: "14px", color: "var(--cinder-muted)" }}>
                  Selected: <CDTag size="sm" variant="primary">{selectedDate.toDateString()}</CDTag>
                </div>
                <div style={{ fontSize: "13px", color: "var(--cinder-muted)" }}>
                  View mode: <code style={{ color: "var(--cinder-primary)" }}>{mode}</code>
                </div>
              </div>

              <CDCalendar
                value={selectedDate}
                onChange={(d: Date) => setSelectedDate(d)}
                mode={mode}
                onModeChange={(m: "day" | "week" | "month" | "year") => {
                  if (m === "month" || m === "year") setMode(m);
                }}
                dateCellRender={(d: Date) => {
                  const event = getEventForDate(d);
                  if (!event) return null;
                  return (
                    <div style={{ marginTop: "4px" }}>
                      <CDBadge variant={event.variant === "primary" ? "accent" : event.variant} dot size="sm">
                        <span style={{ fontSize: "10px", lineHeight: "1" }}>{event.text}</span>
                      </CDBadge>
                    </div>
                  );
                }}
              />
            </div>
          </DemoCard>
        </div>
      </section>

      {/* API Specification Section */}
      <section id="api" className="antd-doc-section">
        <h2 className="antd-section-heading">API Specification</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <ApiTable title="CDOutlookCalendar API" data={outlookCalendarApi} />
          <ApiTable title="CDCalendarEvent Data Model" data={calendarEventApi} />
        </div>
      </section>
    </div>
  );
}
