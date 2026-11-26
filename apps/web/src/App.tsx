import { lazy, Suspense, type ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, Spinner } from "@tec-triad/cinder-ui";
import { HomePage } from "./pages/HomePage";
import { DocsLayout } from "./layouts/DocsLayout";
import { ScrollToTop } from "./components/ScrollToTop";

// Lazy-loaded routes for optimal initial bundle performance
const GettingStartedDocPage = lazy(() => import("./pages/GettingStartedDocPage").then((m) => ({ default: m.GettingStartedDocPage })));
const IconExplorerPage = lazy(() => import("./pages/icons/IconExplorerPage").then((m) => ({ default: m.IconExplorerPage })));
const ComponentOverviewPage = lazy(() => import("./pages/ComponentOverviewPage").then((m) => ({ default: m.ComponentOverviewPage })));
const TokensPage = lazy(() => import("./pages/TokensPage").then((m) => ({ default: m.TokensPage })));
const ButtonDocPage = lazy(() => import("./pages/components/ButtonDocPage").then((m) => ({ default: m.ButtonDocPage })));
const InputDocPage = lazy(() => import("./pages/components/InputDocPage").then((m) => ({ default: m.InputDocPage })));
const BadgeDocPage = lazy(() => import("./pages/components/BadgeDocPage").then((m) => ({ default: m.BadgeDocPage })));
const CardDocPage = lazy(() => import("./pages/components/CardDocPage").then((m) => ({ default: m.CardDocPage })));
const IconDocPage = lazy(() => import("./pages/components/IconDocPage").then((m) => ({ default: m.IconDocPage })));
const SelectDocPage = lazy(() => import("./pages/components/SelectDocPage").then((m) => ({ default: m.SelectDocPage })));
const DropdownDocPage = lazy(() => import("./pages/components/DropdownDocPage").then((m) => ({ default: m.DropdownDocPage })));
const FloatButtonDocPage = lazy(() => import("./pages/components/FloatButtonDocPage").then((m) => ({ default: m.FloatButtonDocPage })));
const CheckboxDocPage = lazy(() => import("./pages/components/CheckboxDocPage").then((m) => ({ default: m.CheckboxDocPage })));
const AlertDocPage = lazy(() => import("./pages/components/AlertDocPage").then((m) => ({ default: m.AlertDocPage })));
const ToastDocPage = lazy(() => import("./pages/components/ToastDocPage").then((m) => ({ default: m.ToastDocPage })));
const SpinnerDocPage = lazy(() => import("./pages/components/SpinnerDocPage").then((m) => ({ default: m.SpinnerDocPage })));
const SkeletonDocPage = lazy(() => import("./pages/components/SkeletonDocPage").then((m) => ({ default: m.SkeletonDocPage })));
const ProgressDocPage = lazy(() => import("./pages/components/ProgressDocPage").then((m) => ({ default: m.ProgressDocPage })));
const ModalDocPage = lazy(() => import("./pages/components/ModalDocPage").then((m) => ({ default: m.ModalDocPage })));
const DrawerDocPage = lazy(() => import("./pages/components/DrawerDocPage").then((m) => ({ default: m.DrawerDocPage })));
const TooltipDocPage = lazy(() => import("./pages/components/TooltipDocPage").then((m) => ({ default: m.TooltipDocPage })));
const PopoverDocPage = lazy(() => import("./pages/components/PopoverDocPage").then((m) => ({ default: m.PopoverDocPage })));
const TagDocPage = lazy(() => import("./pages/components/TagDocPage").then((m) => ({ default: m.TagDocPage })));
const AvatarDocPage = lazy(() => import("./pages/components/AvatarDocPage").then((m) => ({ default: m.AvatarDocPage })));
const AccordionDocPage = lazy(() => import("./pages/components/AccordionDocPage").then((m) => ({ default: m.AccordionDocPage })));
const ListDocPage = lazy(() => import("./pages/components/ListDocPage").then((m) => ({ default: m.ListDocPage })));
const TableDocPage = lazy(() => import("./pages/components/TableDocPage").then((m) => ({ default: m.TableDocPage })));
const DatePickerDocPage = lazy(() => import("./pages/components/DatePickerDocPage").then((m) => ({ default: m.DatePickerDocPage })));
const TimePickerDocPage = lazy(() => import("./pages/components/TimePickerDocPage").then((m) => ({ default: m.TimePickerDocPage })));
const CalendarDocPage = lazy(() => import("./pages/components/CalendarDocPage").then((m) => ({ default: m.CalendarDocPage })));
const LinkDocPage = lazy(() => import("./pages/components/LinkDocPage").then((m) => ({ default: m.LinkDocPage })));
const NavbarDocPage = lazy(() => import("./pages/components/NavbarDocPage").then((m) => ({ default: m.NavbarDocPage })));
const SidebarDocPage = lazy(() => import("./pages/components/SidebarDocPage").then((m) => ({ default: m.SidebarDocPage })));
const TabsDocPage = lazy(() => import("./pages/components/TabsDocPage").then((m) => ({ default: m.TabsDocPage })));
const BreadcrumbDocPage = lazy(() => import("./pages/components/BreadcrumbDocPage").then((m) => ({ default: m.BreadcrumbDocPage })));
const PaginationDocPage = lazy(() => import("./pages/components/PaginationDocPage").then((m) => ({ default: m.PaginationDocPage })));
const StepperDocPage = lazy(() => import("./pages/components/StepperDocPage").then((m) => ({ default: m.StepperDocPage })));
const RadioDocPage = lazy(() => import("./pages/components/RadioDocPage").then((m) => ({ default: m.RadioDocPage })));
const SwitchDocPage = lazy(() => import("./pages/components/SwitchDocPage").then((m) => ({ default: m.SwitchDocPage })));
const SliderDocPage = lazy(() => import("./pages/components/SliderDocPage").then((m) => ({ default: m.SliderDocPage })));
const TextAreaDocPage = lazy(() => import("./pages/components/TextAreaDocPage").then((m) => ({ default: m.TextAreaDocPage })));
const TypographyDocPage = lazy(() => import("./pages/components/TypographyDocPage").then((m) => ({ default: m.TypographyDocPage })));
const FilePickerDocPage = lazy(() => import("./pages/components/FilePickerDocPage").then((m) => ({ default: m.FilePickerDocPage })));
const FormBuilderDocPage = lazy(() => import("./pages/components/FormBuilderDocPage").then((m) => ({ default: m.FormBuilderDocPage })));
const EditorDocPage = lazy(() => import("./pages/components/EditorDocPage").then((m) => ({ default: m.EditorDocPage })));
const ChartDocPage = lazy(() => import("./pages/components/ChartDocPage").then((m) => ({ default: m.ChartDocPage })));
const LayoutDocPage = lazy(() => import("./pages/components/LayoutDocPage").then((m) => ({ default: m.LayoutDocPage })));
const JSONEditorDocPage = lazy(() => import("./pages/components/JSONEditorDocPage").then((m) => ({ default: m.JSONEditorDocPage })));
const CodeEditorDocPage = lazy(() => import("./pages/components/CodeEditorDocPage").then((m) => ({ default: m.CodeEditorDocPage })));
const ColorPickerProDocPage = lazy(() => import("./pages/components/ColorPickerProDocPage").then((m) => ({ default: m.ColorPickerProDocPage })));
const TimeRangePickerDocPage = lazy(() => import("./pages/components/TimeRangePickerDocPage").then((m) => ({ default: m.TimeRangePickerDocPage })));
const PhoneInputDocPage = lazy(() => import("./pages/components/PhoneInputDocPage").then((m) => ({ default: m.PhoneInputDocPage })));
const AddressAutocompleteDocPage = lazy(() => import("./pages/components/AddressAutocompleteDocPage").then((m) => ({ default: m.AddressAutocompleteDocPage })));
const MultiSelectProDocPage = lazy(() => import("./pages/components/MultiSelectProDocPage").then((m) => ({ default: m.MultiSelectProDocPage })));
const OTPInputDocPage = lazy(() => import("./pages/components/OTPInputDocPage").then((m) => ({ default: m.OTPInputDocPage })));

function RouteLoadingFallback(): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "45vh",
        width: "100%",
        flexDirection: "column",
        gap: "14px",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading documentation module"
    >
      <Spinner size="lg" />
      <span
        style={{
          fontSize: "13px",
          color: "var(--cinder-muted)",
          fontFamily: "var(--cinder-font-mono)",
        }}
      >
        Loading component module...
      </span>
    </div>
  );
}

export function App(): ReactElement {
  return (
    <ThemeProvider defaultMode="dark" defaultThemeId="dark">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Main Landing Route */}
            <Route path="/" element={<HomePage />} />

            {/* IconForge Ecosystem & Studio */}
            <Route path="/icons" element={<IconExplorerPage />} />

            {/* Component Documentation Routes (Cinder Architecture) */}
            <Route path="/components" element={<DocsLayout />}>
              <Route index element={<Navigate to="/components/getting-started" replace />} />
              <Route path="getting-started" element={<GettingStartedDocPage />} />
              <Route path="installation" element={<GettingStartedDocPage />} />
              <Route path="overview" element={<ComponentOverviewPage />} />
              <Route path="button" element={<ButtonDocPage />} />
              <Route path="float-button" element={<FloatButtonDocPage />} />
              <Route path="icon" element={<IconDocPage />} />
              <Route path="icon-button" element={<ButtonDocPage />} />
              <Route path="dropdown" element={<DropdownDocPage />} />
              <Route path="button-dropdown" element={<ButtonDocPage />} />
              <Route path="copy-button" element={<ButtonDocPage />} />
              <Route path="input" element={<InputDocPage />} />
              <Route path="select" element={<SelectDocPage />} />
              <Route path="checkbox" element={<CheckboxDocPage />} />
              <Route path="badge" element={<BadgeDocPage />} />
              <Route path="card" element={<CardDocPage />} />
              <Route path="glass-panel" element={<CardDocPage />} />
              <Route path="snippet" element={<CardDocPage />} />
              <Route path="alert" element={<AlertDocPage />} />
              <Route path="banner" element={<AlertDocPage />} />
              <Route path="toast" element={<ToastDocPage />} />
              <Route path="snackbar" element={<ToastDocPage />} />
              <Route path="spinner" element={<SpinnerDocPage />} />
              <Route path="loader" element={<SpinnerDocPage />} />
              <Route path="skeleton" element={<SkeletonDocPage />} />
              <Route path="progress" element={<ProgressDocPage />} />
              <Route path="modal" element={<ModalDocPage />} />
              <Route path="dialog" element={<ModalDocPage />} />
              <Route path="drawer" element={<DrawerDocPage />} />
              <Route path="sheet" element={<DrawerDocPage />} />
              <Route path="tooltip" element={<TooltipDocPage />} />
              <Route path="popover" element={<PopoverDocPage />} />
              <Route path="dropdown-menu" element={<DropdownDocPage />} />
              <Route path="tag" element={<TagDocPage />} />
              <Route path="chip" element={<TagDocPage />} />
              <Route path="avatar" element={<AvatarDocPage />} />
              <Route path="avatar-group" element={<AvatarDocPage />} />
              <Route path="accordion" element={<AccordionDocPage />} />
              <Route path="collapse" element={<AccordionDocPage />} />
              <Route path="list" element={<ListDocPage />} />
              <Route path="table" element={<TableDocPage />} />
              <Route path="data-grid" element={<TableDocPage />} />
              <Route path="date-picker" element={<DatePickerDocPage />} />
              <Route path="date-range-picker" element={<DatePickerDocPage />} />
              <Route path="time-picker" element={<TimePickerDocPage />} />
              <Route path="calendar" element={<CalendarDocPage />} />
              <Route path="outlook-calendar" element={<CalendarDocPage />} />
              <Route path="link" element={<LinkDocPage />} />
              <Route path="navbar" element={<NavbarDocPage />} />
              <Route path="header" element={<NavbarDocPage />} />
              <Route path="sidebar" element={<SidebarDocPage />} />
              <Route path="tabs" element={<TabsDocPage />} />
              <Route path="breadcrumb" element={<BreadcrumbDocPage />} />
              <Route path="breadcrumbs" element={<BreadcrumbDocPage />} />
              <Route path="pagination" element={<PaginationDocPage />} />
              <Route path="stepper" element={<StepperDocPage />} />
              <Route path="steps" element={<StepperDocPage />} />
              <Route path="radio" element={<RadioDocPage />} />
              <Route path="switch" element={<SwitchDocPage />} />
              <Route path="toggle" element={<SwitchDocPage />} />
              <Route path="slider" element={<SliderDocPage />} />
              <Route path="range-slider" element={<SliderDocPage />} />
              <Route path="textarea" element={<TextAreaDocPage />} />
              <Route path="text-area" element={<TextAreaDocPage />} />
              <Route path="typography" element={<TypographyDocPage />} />
              <Route path="heading" element={<TypographyDocPage />} />
              <Route path="text" element={<TypographyDocPage />} />
              <Route path="paragraph" element={<TypographyDocPage />} />
              <Route path="file-picker" element={<FilePickerDocPage />} />
              <Route path="upload" element={<FilePickerDocPage />} />
              <Route path="form-builder" element={<FormBuilderDocPage />} />
              <Route path="form" element={<FormBuilderDocPage />} />
              <Route path="editor" element={<EditorDocPage />} />
              <Route path="rich-editor" element={<EditorDocPage />} />
              <Route path="json-editor" element={<JSONEditorDocPage />} />
              <Route path="code-editor" element={<CodeEditorDocPage />} />
              <Route path="color-picker-pro" element={<ColorPickerProDocPage />} />
              <Route path="time-range-picker" element={<TimeRangePickerDocPage />} />
              <Route path="phone-input" element={<PhoneInputDocPage />} />
              <Route path="address-autocomplete" element={<AddressAutocompleteDocPage />} />
              <Route path="multi-select-pro" element={<MultiSelectProDocPage />} />
              <Route path="otp-input" element={<OTPInputDocPage />} />
              <Route path="chart" element={<ChartDocPage />} />
              <Route path="charts" element={<ChartDocPage />} />
              <Route path="graph" element={<ChartDocPage />} />
              <Route path="graphs" element={<ChartDocPage />} />
              <Route path="layout" element={<LayoutDocPage />} />
              <Route path="box" element={<LayoutDocPage />} />
              <Route path="container" element={<LayoutDocPage />} />
              <Route path="grid" element={<LayoutDocPage />} />
              <Route path="stack" element={<LayoutDocPage />} />
              <Route path="divider" element={<LayoutDocPage />} />
              <Route path="spacer" element={<LayoutDocPage />} />
            </Route>

            {/* Design Tokens Route */}
            <Route path="/tokens" element={<DocsLayout />}>
              <Route index element={<TokensPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
