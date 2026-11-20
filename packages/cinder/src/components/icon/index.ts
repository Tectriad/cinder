export * from "./types";
export * from "./CDIcon";

// General Icons
export * from "./icons/general";

// Navigation Icons
export * from "./icons/navigation";

// Action Icons
export * from "./icons/actions";

// Media & Tech Icons
export * from "./icons/media";

import type { CDIconMetadata } from "./types";
import {
  CDSparklesIcon,
  CDSunIcon,
  CDMoonIcon,
  CDFlameIcon,
  CDBoxIcon,
  CDLayersIcon,
  CDSettingsIcon,
  CDInfoIcon,
  CDAlertCircleIcon,
  CDCheckCircleIcon,
  CDHelpCircleIcon,
} from "./icons/general";

import {
  CDArrowRightIcon,
  CDArrowLeftIcon,
  CDArrowUpIcon,
  CDArrowDownIcon,
  CDChevronDownIcon,
  CDChevronRightIcon,
  CDChevronUpIcon,
  CDChevronLeftIcon,
  CDMenuIcon,
  CDCloseIcon,
  CDExternalLinkIcon,
} from "./icons/navigation";

import {
  CDSearchIcon,
  CDCopyIcon,
  CDCheckIcon,
  CDPlusIcon,
  CDMinusIcon,
  CDTrashIcon,
  CDDownloadIcon,
  CDUploadIcon,
  CDShareIcon,
  CDRefreshIcon,
  CDFilterIcon,
  CDSlidersIcon,
  CDMaximizeIcon,
  CDEditIcon,
} from "./icons/actions";

import {
  CDCodeIcon,
  CDTerminalIcon,
  CDFolderIcon,
  CDFileIcon,
  CDDatabaseIcon,
  CDCpuIcon,
  CDShieldIcon,
  CDLockIcon,
  CDUnlockIcon,
  CDMailIcon,
  CDUserIcon,
  CDHeartIcon,
  CDStarIcon,
  CDGlobeIcon,
} from "./icons/media";

export const CDIcons = {
  // General
  Sparkles: CDSparklesIcon,
  Sun: CDSunIcon,
  Moon: CDMoonIcon,
  Flame: CDFlameIcon,
  Box: CDBoxIcon,
  Layers: CDLayersIcon,
  Settings: CDSettingsIcon,
  Info: CDInfoIcon,
  AlertCircle: CDAlertCircleIcon,
  CheckCircle: CDCheckCircleIcon,
  HelpCircle: CDHelpCircleIcon,

  // Navigation
  ArrowRight: CDArrowRightIcon,
  ArrowLeft: CDArrowLeftIcon,
  ArrowUp: CDArrowUpIcon,
  ArrowDown: CDArrowDownIcon,
  ChevronDown: CDChevronDownIcon,
  ChevronRight: CDChevronRightIcon,
  ChevronUp: CDChevronUpIcon,
  ChevronLeft: CDChevronLeftIcon,
  Menu: CDMenuIcon,
  Close: CDCloseIcon,
  ExternalLink: CDExternalLinkIcon,

  // Actions
  Search: CDSearchIcon,
  Copy: CDCopyIcon,
  Check: CDCheckIcon,
  Plus: CDPlusIcon,
  Minus: CDMinusIcon,
  Trash: CDTrashIcon,
  Download: CDDownloadIcon,
  Upload: CDUploadIcon,
  Share: CDShareIcon,
  Refresh: CDRefreshIcon,
  Filter: CDFilterIcon,
  Sliders: CDSlidersIcon,
  Maximize: CDMaximizeIcon,
  Edit: CDEditIcon,

  // Media & Tech
  Code: CDCodeIcon,
  Terminal: CDTerminalIcon,
  Folder: CDFolderIcon,
  File: CDFileIcon,
  Database: CDDatabaseIcon,
  Cpu: CDCpuIcon,
  Shield: CDShieldIcon,
  Lock: CDLockIcon,
  Unlock: CDUnlockIcon,
  Mail: CDMailIcon,
  User: CDUserIcon,
  Heart: CDHeartIcon,
  Star: CDStarIcon,
  Globe: CDGlobeIcon,
};

export const Icons = CDIcons;

export const ALL_CD_ICONS: CDIconMetadata[] = [
  // General
  { name: "CDSparklesIcon", category: "general", keywords: ["sparkles", "ai", "magic", "clean", "star"], component: CDSparklesIcon },
  { name: "CDSunIcon", category: "general", keywords: ["sun", "light", "day", "brightness", "theme"], component: CDSunIcon },
  { name: "CDMoonIcon", category: "general", keywords: ["moon", "dark", "night", "theme"], component: CDMoonIcon },
  { name: "CDFlameIcon", category: "general", keywords: ["flame", "fire", "cinder", "hot", "trending"], component: CDFlameIcon },
  { name: "CDBoxIcon", category: "general", keywords: ["box", "cube", "package", "container"], component: CDBoxIcon },
  { name: "CDLayersIcon", category: "general", keywords: ["layers", "stack", "surface", "design"], component: CDLayersIcon },
  { name: "CDSettingsIcon", category: "general", keywords: ["settings", "gear", "options", "config"], component: CDSettingsIcon },
  { name: "CDInfoIcon", category: "general", keywords: ["info", "information", "help", "circle"], component: CDInfoIcon },
  { name: "CDAlertCircleIcon", category: "general", keywords: ["alert", "warning", "caution", "danger"], component: CDAlertCircleIcon },
  { name: "CDCheckCircleIcon", category: "general", keywords: ["check", "success", "circle", "done"], component: CDCheckCircleIcon },
  { name: "CDHelpCircleIcon", category: "general", keywords: ["help", "question", "faq", "circle"], component: CDHelpCircleIcon },

  // Navigation
  { name: "CDArrowRightIcon", category: "navigation", keywords: ["arrow", "right", "next", "forward"], component: CDArrowRightIcon },
  { name: "CDArrowLeftIcon", category: "navigation", keywords: ["arrow", "left", "back", "previous"], component: CDArrowLeftIcon },
  { name: "CDArrowUpIcon", category: "navigation", keywords: ["arrow", "up", "top", "asc"], component: CDArrowUpIcon },
  { name: "CDArrowDownIcon", category: "navigation", keywords: ["arrow", "down", "bottom", "desc"], component: CDArrowDownIcon },
  { name: "CDChevronDownIcon", category: "navigation", keywords: ["chevron", "down", "caret", "dropdown"], component: CDChevronDownIcon },
  { name: "CDChevronRightIcon", category: "navigation", keywords: ["chevron", "right", "caret", "next"], component: CDChevronRightIcon },
  { name: "CDChevronUpIcon", category: "navigation", keywords: ["chevron", "up", "caret"], component: CDChevronUpIcon },
  { name: "CDChevronLeftIcon", category: "navigation", keywords: ["chevron", "left", "caret", "prev"], component: CDChevronLeftIcon },
  { name: "CDMenuIcon", category: "navigation", keywords: ["menu", "hamburger", "bars", "drawer"], component: CDMenuIcon },
  { name: "CDCloseIcon", category: "navigation", keywords: ["close", "x", "cross", "cancel", "clear"], component: CDCloseIcon },
  { name: "CDExternalLinkIcon", category: "navigation", keywords: ["external", "link", "open", "tab"], component: CDExternalLinkIcon },

  // Actions
  { name: "CDSearchIcon", category: "actions", keywords: ["search", "find", "magnifier", "lookup"], component: CDSearchIcon },
  { name: "CDCopyIcon", category: "actions", keywords: ["copy", "clipboard", "duplicate"], component: CDCopyIcon },
  { name: "CDCheckIcon", category: "actions", keywords: ["check", "done", "tick", "confirm"], component: CDCheckIcon },
  { name: "CDPlusIcon", category: "actions", keywords: ["plus", "add", "new", "create"], component: CDPlusIcon },
  { name: "CDMinusIcon", category: "actions", keywords: ["minus", "remove", "subtract"], component: CDMinusIcon },
  { name: "CDTrashIcon", category: "actions", keywords: ["trash", "delete", "remove", "bin"], component: CDTrashIcon },
  { name: "CDDownloadIcon", category: "actions", keywords: ["download", "save", "export"], component: CDDownloadIcon },
  { name: "CDUploadIcon", category: "actions", keywords: ["upload", "import", "publish"], component: CDUploadIcon },
  { name: "CDShareIcon", category: "actions", keywords: ["share", "nodes", "send"], component: CDShareIcon },
  { name: "CDRefreshIcon", category: "actions", keywords: ["refresh", "reload", "sync", "cycle"], component: CDRefreshIcon },
  { name: "CDFilterIcon", category: "actions", keywords: ["filter", "funnel", "sort"], component: CDFilterIcon },
  { name: "CDSlidersIcon", category: "actions", keywords: ["sliders", "controls", "tune", "adjust"], component: CDSlidersIcon },
  { name: "CDMaximizeIcon", category: "actions", keywords: ["maximize", "expand", "fullscreen"], component: CDMaximizeIcon },
  { name: "CDEditIcon", category: "actions", keywords: ["edit", "pencil", "write", "modify"], component: CDEditIcon },

  // Media & Tech
  { name: "CDCodeIcon", category: "media", keywords: ["code", "brackets", "embed", "developer"], component: CDCodeIcon },
  { name: "CDTerminalIcon", category: "media", keywords: ["terminal", "console", "cli", "prompt"], component: CDTerminalIcon },
  { name: "CDFolderIcon", category: "media", keywords: ["folder", "directory", "archive"], component: CDFolderIcon },
  { name: "CDFileIcon", category: "media", keywords: ["file", "document", "page", "text"], component: CDFileIcon },
  { name: "CDDatabaseIcon", category: "media", keywords: ["database", "storage", "sql", "data"], component: CDDatabaseIcon },
  { name: "CDCpuIcon", category: "media", keywords: ["cpu", "processor", "chip", "hardware"], component: CDCpuIcon },
  { name: "CDShieldIcon", category: "media", keywords: ["shield", "security", "protect", "safe"], component: CDShieldIcon },
  { name: "CDLockIcon", category: "media", keywords: ["lock", "private", "secure", "closed"], component: CDLockIcon },
  { name: "CDUnlockIcon", category: "media", keywords: ["unlock", "open", "public", "insecure"], component: CDUnlockIcon },
  { name: "CDMailIcon", category: "media", keywords: ["mail", "email", "envelope", "inbox"], component: CDMailIcon },
  { name: "CDUserIcon", category: "media", keywords: ["user", "account", "profile", "person"], component: CDUserIcon },
  { name: "CDHeartIcon", category: "media", keywords: ["heart", "like", "favorite", "love"], component: CDHeartIcon },
  { name: "CDStarIcon", category: "media", keywords: ["star", "rating", "bookmark", "favorite"], component: CDStarIcon },
  { name: "CDGlobeIcon", category: "media", keywords: ["globe", "world", "web", "internet", "network"], component: CDGlobeIcon },
];
