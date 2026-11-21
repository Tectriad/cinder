import { useState, type ReactElement } from "react";
import {
  CDColumnChart,
  CDBarChart,
  CDPieChart,
  CDRadialBarChart,
  CDLineChart,
  CDAreaChart,
  Badge,
  Button,
} from "@cinder-ui/core";
import { DemoCard } from "../../components/DemoCard";
import { ApiTable } from "../../components/ApiTable";

export function ChartDocPage(): ReactElement {
  const [pieVariant, setPieVariant] = useState<"donut" | "pie">("donut");
  const [stackedColumns, setStackedColumns] = useState<boolean>(false);
  const [lineSmooth, setLineSmooth] = useState<boolean>(true);
  const [areaStacked, setAreaStacked] = useState<boolean>(false);
  const [areaGradient, setAreaGradient] = useState<boolean>(true);

  // Sample data: Monthly Analytics (Column Chart)
  const monthlyLabels: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const monthlyDatasets = [
    { label: "Cloud Services ($k)", data: [65, 82, 78, 95, 110, 125, 142], color: "#3b82f6" },
    { label: "Enterprise ARR ($k)", data: [42, 54, 61, 72, 85, 96, 108], color: "#10b981" },
    { label: "Support Plans ($k)", data: [18, 22, 25, 28, 32, 36, 40], color: "#f59e0b" },
  ];

  // Sample data: Latency & Performance (Horizontal Bar Chart)
  const regionLabels: string[] = ["US-East", "US-West", "EU-Central", "AP-South", "SA-East"];
  const regionDatasets = [
    { label: "P95 Latency (ms)", data: [38, 45, 62, 84, 115], color: "#0ea5e9" },
    { label: "P99 Latency (ms)", data: [72, 88, 110, 142, 195], color: "#8b5cf6" },
  ];

  // Sample data: Real-time Throughput (Line Chart)
  const timeLabels: string[] = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  const throughputDatasets = [
    { label: "Frontend Cluster (req/s)", data: [120, 190, 480, 850, 920, 680, 240], color: "#3b82f6" },
    { label: "API Gateway (req/s)", data: [90, 140, 360, 640, 710, 520, 180], color: "#10b981" },
    { label: "Background Workers", data: [40, 45, 110, 220, 260, 190, 70], color: "#f59e0b", borderDash: [5, 5] },
  ];

  // Sample data: Multi-region Traffic (Area Chart)
  const trafficLabels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const trafficDatasets = [
    { label: "US-East Egress (TB)", data: [45, 52, 68, 74, 82, 60, 48], color: "#3b82f6" },
    { label: "EU-Central Egress (TB)", data: [32, 40, 48, 55, 62, 44, 35], color: "#0ea5e9" },
    { label: "AP-South Egress (TB)", data: [18, 24, 30, 36, 42, 28, 22], color: "#8b5cf6" },
  ];

  // Sample data: Infrastructure Breakdown (Pie & Donut)
  const infraLabels: string[] = ["Kubernetes Nodes", "Serverless Edge", "Database Clusters", "Object Storage"];
  const infraData: number[] = [440, 260, 180, 120];
  const infraColors: string[] = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b"];

  // Sample data: System Resource Health (Radial Bar Chart)
  const systemHealth = [
    { label: "CPU Utilization", value: 78, max: 100, color: "#3b82f6", formattedValue: "78 Cores" },
    { label: "Memory Pool", value: 64, max: 100, color: "#10b981", formattedValue: "64 GB" },
    { label: "Disk Bandwidth", value: 89, max: 100, color: "#f59e0b", formattedValue: "8.9 GB/s" },
    { label: "Network Egress", value: 45, max: 100, color: "#8b5cf6", formattedValue: "4.5 Gbps" },
  ];

  const chartProps = [
    { property: "title", description: "Chart title displayed in header card", type: "string", default: "-" },
    { property: "subtitle", description: "Subtitle descriptor rendered under the title", type: "string", default: "-" },
    { property: "height", description: "Canvas viewport height in pixels or CSS string", type: "number | string", default: "320" },
    { property: "width", description: "Outer container width", type: "number | string", default: "'100%'" },
    { property: "themeMode", description: "Color theme mode ('dark' | 'light' | 'auto')", type: "string", default: "'auto'" },
    { property: "animate", description: "Whether to execute entry transition physics", type: "boolean", default: "true" },
    { property: "showLegend", description: "Toggle legend display", type: "boolean", default: "true" },
    { property: "legendPosition", description: "Placement of legend ('top' | 'bottom' | 'left' | 'right')", type: "string", default: "'top'" },
    { property: "showGrid", description: "Display background coordinate grid lines", type: "boolean", default: "true" },
    { property: "showTooltip", description: "Enable hover information tooltip card", type: "boolean", default: "true" },
    { property: "extra", description: "Action elements rendered on top-right header", type: "ReactNode", default: "-" },
  ];

  const lineAreaProps = [
    { property: "smooth", description: "Smooth curves with cubic bezier tension (Line & Area)", type: "boolean", default: "true" },
    { property: "tension", description: "Bezier tension strength between points", type: "number", default: "0.35" },
    { property: "showPoints", description: "Render circular marker glyphs on coordinates", type: "boolean", default: "true (Line) / false (Area)" },
    { property: "gradient", description: "Render semi-transparent vertical gradient fill (Area)", type: "boolean", default: "true" },
    { property: "fillOpacity", description: "Alpha transparency level for area fills (Area)", type: "number", default: "0.25" },
    { property: "stacked", description: "Stack area curves along the Y-axis (Area)", type: "boolean", default: "false" },
    { property: "stepped", description: "Step-curve interpolation mode ('before' | 'after' | 'middle')", type: "boolean | string", default: "false" },
  ];

  return (
    <div className="cinder-doc-page">
      <div className="cinder-doc-header">
        <h1 className="cinder-doc-title">Charts &amp; Graphs</h1>
        <p className="cinder-doc-lead">
          High-performance, GPU-accelerated visualization components powered by Chart.js. Includes Line Charts, Area Charts, vertical Column Charts, horizontal Bar Charts, Pie &amp; Donut Charts, and multi-ring Radial Bar Charts styled in Cinder Slate.
        </p>

        <div className="cinder-doc-import">
          <code>import &#123; CDLineChart, CDAreaChart, CDColumnChart, CDBarChart, CDPieChart, CDRadialBarChart &#125; from '@cinder-ui/core';</code>
        </div>
      </div>

      <section id="when-to-use" className="cinder-doc-section">
        <h2 className="cinder-section-heading">When To Use</h2>
        <ul className="cinder-doc-list">
          <li><strong>CDLineChart</strong>: For continuous time-series trends, rate monitors, dashed comparison targets, and multi-stream telemetry.</li>
          <li><strong>CDAreaChart</strong>: For volumetric time-series, bandwidth distribution, and cumulative stacked volume across data streams.</li>
          <li><strong>CDColumnChart</strong>: For vertical time-series comparisons, monthly revenue projections, and discrete categorical distributions.</li>
          <li><strong>CDBarChart</strong>: For horizontal ranking, benchmark comparisons, regional latency analysis, or long category names.</li>
          <li><strong>CDPieChart</strong>: For part-to-whole proportions, infrastructure allocations, and donut metrics with central summaries.</li>
          <li><strong>CDRadialBarChart</strong>: For circular progress rings, goal completions, and system health status monitors.</li>
        </ul>
      </section>

      <section id="examples" className="cinder-doc-section">
        <h2 className="cinder-section-heading">Examples</h2>

        <div className="cinder-demos-grid">
          {/* Demo 1: Line Chart */}
          <DemoCard
            fullWidth
            title="Line Chart (CDLineChart)"
            description="Continuous multi-series time-series with cubic bezier smoothing, marker indicators, and custom dashed baseline."
            code={`import { CDLineChart } from '@cinder-ui/core';

export default () => (
  <CDLineChart
    title="Service Throughput & Latency"
    subtitle="Live request volume across cluster tiers"
    labels={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']}
    datasets={[
      { label: 'Frontend Cluster (req/s)', data: [120, 190, 480, 850, 920, 680, 240], color: '#3b82f6' },
      { label: 'API Gateway (req/s)', data: [90, 140, 360, 640, 710, 520, 180], color: '#10b981' },
      { label: 'Background Workers', data: [40, 45, 110, 220, 260, 190, 70], color: '#f59e0b', borderDash: [5, 5] },
    ]}
    height={300}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDLineChart
                title="Service Throughput &amp; Ingress"
                subtitle="Live request volume across cluster tiers (24h observation window)"
                labels={timeLabels}
                datasets={throughputDatasets}
                smooth={lineSmooth}
                height={300}
                extra={
                  <Button
                    size="sm"
                    variant={lineSmooth ? "primary" : "outline"}
                    onClick={() => setLineSmooth(!lineSmooth)}
                  >
                    {lineSmooth ? "Smooth: On" : "Smooth: Off"}
                  </Button>
                }
              />
            </div>
          </DemoCard>

          {/* Demo 2: Area Chart */}
          <DemoCard
            fullWidth
            title="Area Chart (CDAreaChart)"
            description="Gradient-filled volumetric curves with stacked layers support and seamless light/dark mode adaptation."
            code={`import { CDAreaChart } from '@cinder-ui/core';

export default () => (
  <CDAreaChart
    title="Multi-region Network Egress"
    subtitle="Weekly aggregated data transfer volume in Terabytes"
    labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
    datasets={[
      { label: 'US-East (TB)', data: [45, 52, 68, 74, 82, 60, 48], color: '#3b82f6' },
      { label: 'EU-Central (TB)', data: [32, 40, 48, 55, 62, 44, 35], color: '#0ea5e9' },
      { label: 'AP-South (TB)', data: [18, 24, 30, 36, 42, 28, 22], color: '#8b5cf6' },
    ]}
    height={300}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDAreaChart
                title="Multi-region Network Egress"
                subtitle="Weekly aggregated data transfer volume in Terabytes"
                labels={trafficLabels}
                datasets={trafficDatasets}
                stacked={areaStacked}
                gradient={areaGradient}
                height={300}
                extra={
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button
                      size="sm"
                      variant={areaStacked ? "primary" : "outline"}
                      onClick={() => setAreaStacked(!areaStacked)}
                    >
                      {areaStacked ? "Stacked: Active" : "Stack Areas"}
                    </Button>
                    <Button
                      size="sm"
                      variant={areaGradient ? "primary" : "outline"}
                      onClick={() => setAreaGradient(!areaGradient)}
                    >
                      {areaGradient ? "Gradient: On" : "Gradient: Off"}
                    </Button>
                  </div>
                }
              />
            </div>
          </DemoCard>

          {/* Demo 3: Column Chart */}
          <DemoCard
            fullWidth
            title="Vertical Column Chart (CDColumnChart)"
            description="Categorical time-series columns with rounded caps, responsive legend, and toggleable stacked view."
            code={`import { CDColumnChart } from '@cinder-ui/core';

export default () => (
  <CDColumnChart
    title="Quarterly Enterprise Revenue"
    subtitle="Consolidated metrics across cloud products"
    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
    datasets={[
      { label: 'Cloud Services', data: [65, 82, 78, 95, 110, 125, 142], color: '#3b82f6' },
      { label: 'Enterprise ARR', data: [42, 54, 61, 72, 85, 96, 108], color: '#10b981' },
      { label: 'Support Plans', data: [18, 22, 25, 28, 32, 36, 40], color: '#f59e0b' },
    ]}
    height={300}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDColumnChart
                title="Quarterly Enterprise Revenue"
                subtitle="Consolidated monthly metrics across primary cloud streams"
                labels={monthlyLabels}
                datasets={monthlyDatasets}
                stacked={stackedColumns}
                height={300}
                extra={
                  <Button
                    size="sm"
                    variant={stackedColumns ? "primary" : "outline"}
                    onClick={() => setStackedColumns(!stackedColumns)}
                  >
                    {stackedColumns ? "Stacked: Active" : "Stack Columns"}
                  </Button>
                }
              />
            </div>
          </DemoCard>

          {/* Demo 4: Horizontal Bar Chart */}
          <DemoCard
            fullWidth
            title="Horizontal Bar Chart (CDBarChart)"
            description="Horizontal layout ideal for rankings, latency benchmarks, and categorical labels with extended text lengths."
            code={`import { CDBarChart } from '@cinder-ui/core';

export default () => (
  <CDBarChart
    title="Global Edge Latency Benchmarks"
    subtitle="Measured P95 and P99 round-trip times in milliseconds"
    labels={['US-East', 'US-West', 'EU-Central', 'AP-South', 'SA-East']}
    datasets={[
      { label: 'P95 Latency (ms)', data: [38, 45, 62, 84, 115], color: '#0ea5e9' },
      { label: 'P99 Latency (ms)', data: [72, 88, 110, 142, 195], color: '#8b5cf6' },
    ]}
    height={280}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDBarChart
                title="Global Edge Latency Benchmarks"
                subtitle="Measured P95 and P99 round-trip times in milliseconds"
                labels={regionLabels}
                datasets={regionDatasets}
                height={280}
              />
            </div>
          </DemoCard>

          {/* Demo 5: Pie & Donut Chart */}
          <DemoCard
            fullWidth
            title="Pie & Donut Chart (CDPieChart)"
            description="Proportional breakdown with customizable cutout radius and centered summary metrics for donut presentations."
            code={`import { CDPieChart } from '@cinder-ui/core';

export default () => (
  <CDPieChart
    variant="donut"
    title="Cloud Resource Allocations"
    subtitle="Total active workload distribution across clusters"
    labels={['Kubernetes Nodes', 'Serverless Edge', 'Database Clusters', 'Object Storage']}
    data={[440, 260, 180, 120]}
    centerLabel="Total Units"
    centerValue="1,000"
    height={300}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDPieChart
                variant={pieVariant}
                title="Cloud Resource Allocations"
                subtitle="Total active workload distribution across clusters"
                labels={infraLabels}
                data={infraData}
                colors={infraColors}
                centerLabel="Total Workloads"
                centerValue="1,000"
                height={300}
                extra={
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button
                      size="sm"
                      variant={pieVariant === "donut" ? "primary" : "outline"}
                      onClick={() => setPieVariant("donut")}
                    >
                      Donut
                    </Button>
                    <Button
                      size="sm"
                      variant={pieVariant === "pie" ? "primary" : "outline"}
                      onClick={() => setPieVariant("pie")}
                    >
                      Pie
                    </Button>
                  </div>
                }
              />
            </div>
          </DemoCard>

          {/* Demo 6: Radial Bar Chart */}
          <DemoCard
            fullWidth
            title="Radial Bar Chart (CDRadialBarChart)"
            description="Concentric circular progress rings with rounded caps, center aggregation, and high-density metric breakdown."
            code={`import { CDRadialBarChart } from '@cinder-ui/core';

export default () => (
  <CDRadialBarChart
    title="Infrastructure Health Diagnostics"
    subtitle="Live cluster utilization and resource pressure indicators"
    data={[
      { label: 'CPU Utilization', value: 78, max: 100, color: '#3b82f6', formattedValue: '78 Cores' },
      { label: 'Memory Pool', value: 64, max: 100, color: '#10b981', formattedValue: '64 GB' },
      { label: 'Disk Bandwidth', value: 89, max: 100, color: '#f59e0b', formattedValue: '8.9 GB/s' },
      { label: 'Network Egress', value: 45, max: 100, color: '#8b5cf6', formattedValue: '4.5 Gbps' },
    ]}
    height={320}
  />
);`}
          >
            <div style={{ width: "100%" }}>
              <CDRadialBarChart
                title="Infrastructure Health Diagnostics"
                subtitle="Live cluster utilization and resource pressure indicators"
                data={systemHealth}
                centerLabel="Overall Health"
                centerValue="69%"
                height={320}
                extra={
                  <Badge variant="success" dot pulse>
                    Real-time Telemetry
                  </Badge>
                }
              />
            </div>
          </DemoCard>
        </div>
      </section>

      <section id="api" className="cinder-doc-section">
        <h2 className="cinder-section-heading">API Specification (Common Chart Props)</h2>
        <ApiTable data={chartProps} />

        <h2 className="cinder-section-heading" style={{ marginTop: "32px" }}>
          API Specification (Line &amp; Area Chart Props)
        </h2>
        <ApiTable data={lineAreaProps} />
      </section>
    </div>
  );
}
