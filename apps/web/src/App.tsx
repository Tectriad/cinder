import type { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@cinder-ui/core";
import { HomePage } from "./pages/HomePage";
import { DocsLayout } from "./layouts/DocsLayout";
import { ButtonDocPage } from "./pages/components/ButtonDocPage";
import { InputDocPage } from "./pages/components/InputDocPage";
import { BadgeDocPage } from "./pages/components/BadgeDocPage";
import { CardDocPage } from "./pages/components/CardDocPage";
import { IconDocPage } from "./pages/components/IconDocPage";
import { SelectDocPage } from "./pages/components/SelectDocPage";
import { DropdownDocPage } from "./pages/components/DropdownDocPage";
import { FloatButtonDocPage } from "./pages/components/FloatButtonDocPage";
import { CheckboxDocPage } from "./pages/components/CheckboxDocPage";
import { AlertDocPage } from "./pages/components/AlertDocPage";
import { ToastDocPage } from "./pages/components/ToastDocPage";
import { SpinnerDocPage } from "./pages/components/SpinnerDocPage";
import { SkeletonDocPage } from "./pages/components/SkeletonDocPage";
import { ProgressDocPage } from "./pages/components/ProgressDocPage";
import { ModalDocPage } from "./pages/components/ModalDocPage";
import { DrawerDocPage } from "./pages/components/DrawerDocPage";
import { TooltipDocPage } from "./pages/components/TooltipDocPage";
import { PopoverDocPage } from "./pages/components/PopoverDocPage";
import { TagDocPage } from "./pages/components/TagDocPage";
import { AvatarDocPage } from "./pages/components/AvatarDocPage";
import { AccordionDocPage } from "./pages/components/AccordionDocPage";
import { ListDocPage } from "./pages/components/ListDocPage";
import { TableDocPage } from "./pages/components/TableDocPage";
import { DatePickerDocPage } from "./pages/components/DatePickerDocPage";
import { TimePickerDocPage } from "./pages/components/TimePickerDocPage";
import { CalendarDocPage } from "./pages/components/CalendarDocPage";
import { LinkDocPage } from "./pages/components/LinkDocPage";
import { NavbarDocPage } from "./pages/components/NavbarDocPage";
import { SidebarDocPage } from "./pages/components/SidebarDocPage";
import { TabsDocPage } from "./pages/components/TabsDocPage";
import { BreadcrumbDocPage } from "./pages/components/BreadcrumbDocPage";
import { PaginationDocPage } from "./pages/components/PaginationDocPage";
import { StepperDocPage } from "./pages/components/StepperDocPage";
import { RadioDocPage } from "./pages/components/RadioDocPage";
import { SwitchDocPage } from "./pages/components/SwitchDocPage";
import { SliderDocPage } from "./pages/components/SliderDocPage";
import { TextAreaDocPage } from "./pages/components/TextAreaDocPage";
import { TypographyDocPage } from "./pages/components/TypographyDocPage";
import { FilePickerDocPage } from "./pages/components/FilePickerDocPage";
import { FormBuilderDocPage } from "./pages/components/FormBuilderDocPage";
import { EditorDocPage } from "./pages/components/EditorDocPage";
import { ChartDocPage } from "./pages/components/ChartDocPage";
import { LayoutDocPage } from "./pages/components/LayoutDocPage";
import { JSONEditorDocPage } from "./pages/components/JSONEditorDocPage";
import { CodeEditorDocPage } from "./pages/components/CodeEditorDocPage";
import { ColorPickerProDocPage } from "./pages/components/ColorPickerProDocPage";
import { TimeRangePickerDocPage } from "./pages/components/TimeRangePickerDocPage";
import { PhoneInputDocPage } from "./pages/components/PhoneInputDocPage";
import { AddressAutocompleteDocPage } from "./pages/components/AddressAutocompleteDocPage";
import { MultiSelectProDocPage } from "./pages/components/MultiSelectProDocPage";
import { OTPInputDocPage } from "./pages/components/OTPInputDocPage";
import { ComponentOverviewPage } from "./pages/ComponentOverviewPage";
import { TokensPage } from "./pages/TokensPage";
import { IconExplorerPage } from "./pages/icons/IconExplorerPage";

export function App(): ReactElement {
  return (
    <ThemeProvider defaultMode="dark" defaultThemeId="dark">
      <BrowserRouter>
        <Routes>
          {/* Main Landing Route */}
          <Route path="/" element={<HomePage />} />

          {/* IconForge Ecosystem & Studio */}
          <Route path="/icons" element={<IconExplorerPage />} />

          {/* Component Documentation Routes (Cinder Architecture) */}
          <Route path="/components" element={<DocsLayout />}>
            <Route index element={<Navigate to="/components/button" replace />} />
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
