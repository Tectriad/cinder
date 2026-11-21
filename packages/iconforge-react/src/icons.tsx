import { forwardRef, type ReactElement } from "react";
import { IconForge } from "./IconForge";
import type { IconComponentProps } from "./types";

function createIcon(name: string, displayName: string) {
  const Component = forwardRef<SVGSVGElement, IconComponentProps>(
    (props: IconComponentProps, ref): ReactElement => {
      return <IconForge ref={ref} name={name} {...props} />;
    },
  );
  Component.displayName = displayName;
  return Component;
}

// 1. General UI
export const Home = createIcon("home", "Home");
export const Settings = createIcon("settings", "Settings");
export const User = createIcon("user", "User");
export const Bell = createIcon("bell", "Bell");
export const Search = createIcon("search", "Search");
export const Menu = createIcon("menu", "Menu");
export const XClose = createIcon("x-close", "XClose");
export const Check = createIcon("check", "Check");
export const CheckCircle = createIcon("check-circle", "CheckCircle");
export const AlertTriangle = createIcon("alert-triangle", "AlertTriangle");
export const Info = createIcon("info", "Info");

// 2. Navigation & Arrows
export const ArrowRight = createIcon("arrow-right", "ArrowRight");
export const ArrowLeft = createIcon("arrow-left", "ArrowLeft");
export const ArrowUp = createIcon("arrow-up", "ArrowUp");
export const ArrowDown = createIcon("arrow-down", "ArrowDown");
export const ChevronDown = createIcon("chevron-down", "ChevronDown");
export const ChevronUp = createIcon("chevron-up", "ChevronUp");
export const ExternalLink = createIcon("external-link", "ExternalLink");

// 3. Development
export const Code = createIcon("code", "Code");
export const Terminal = createIcon("terminal", "Terminal");
export const Cpu = createIcon("cpu", "Cpu");
export const Database = createIcon("database", "Database");
export const Server = createIcon("server", "Server");
export const GitBranch = createIcon("git-branch", "GitBranch");
export const GitCommit = createIcon("git-commit", "GitCommit");
export const GitPullRequest = createIcon("git-pull-request", "GitPullRequest");
export const Bug = createIcon("bug", "Bug");

// 4. Frameworks & Tech
export const ReactIcon = createIcon("react", "ReactIcon");
export const Html5Icon = createIcon("html5", "Html5Icon");
export const Css3Icon = createIcon("css3", "Css3Icon");

// 5. AI & Machine Learning
export const AISparkle = createIcon("ai-sparkle", "AISparkle");
export const LLMBrain = createIcon("llm-brain", "LLMBrain");
export const Robot = createIcon("robot", "Robot");
export const NeuralNetwork = createIcon("neural-network", "NeuralNetwork");
export const VectorDatabase = createIcon("vector-database", "VectorDatabase");

// 6. Business & Finance
export const CreditCard = createIcon("credit-card", "CreditCard");
export const Wallet = createIcon("wallet", "Wallet");
export const BarChart = createIcon("bar-chart", "BarChart");
export const ShieldCheck = createIcon("shield-check", "ShieldCheck");
export const Lock = createIcon("lock", "Lock");
export const Folder = createIcon("folder", "Folder");
