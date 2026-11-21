import type { IconCategory, IconCategorySlug } from "./types";

export const ALL_ICON_CATEGORIES: IconCategory[] = [
  { id: "general", name: "General UI", description: "Everyday user interface elements and controls" },
  { id: "navigation", name: "Navigation", description: "Browsing, switching, and routing components" },
  { id: "arrows", name: "Arrows & Directions", description: "Directional indicators and wayfinding arrows" },
  { id: "development", name: "Development & Programming", description: "Core software engineering, syntax, and tooling" },
  { id: "frontend", name: "Frontend Development", description: "UI frameworks, client libraries, and markup" },
  { id: "backend", name: "Backend Development", description: "Server runtimes, engines, and architectural layers" },
  { id: "devops", name: "DevOps & Cloud", description: "Infrastructure, containers, orchestration, and CI/CD" },
  { id: "databases", name: "Databases", description: "SQL, NoSQL, in-memory caches, and storage systems" },
  { id: "ai", name: "AI & Machine Learning", description: "LLMs, neural networks, agents, and embeddings" },
  { id: "cybersecurity", name: "Cybersecurity", description: "Encryption, access control, shields, and auth" },
  { id: "hardware", name: "Hardware & Devices", description: "Processors, computers, phones, and peripherals" },
  { id: "business", name: "Business & Finance", description: "Commercial operations, corporate workflows, and teams" },
  { id: "banking", name: "Banking & Payments", description: "Cards, wallets, transactions, and currency" },
  { id: "ecommerce", name: "E-Commerce & Shopping", description: "Shopping carts, baskets, tags, and stores" },
  { id: "communication", name: "Communication", description: "Mail, chat messages, phones, and mentions" },
  { id: "social", name: "Social Media", description: "Sharing, likes, followers, and public engagement" },
  { id: "files", name: "Files & Documents", description: "File formats, folders, sheets, and archives" },
  { id: "productivity", name: "Productivity", description: "Calendars, tasks, timers, and organization" },
  { id: "analytics", name: "Data & Analytics", description: "Charts, metrics, telemetry, and reporting" },
  { id: "education", name: "Education", description: "Academic learning, books, certificates, and schools" },
  { id: "healthcare", name: "Healthcare", description: "Clinical health, pulses, medicine, and wellness" },
  { id: "medical", name: "Medical Equipment", description: "Diagnostic tools, surgical devices, and clinics" },
  { id: "travel", name: "Travel", description: "Luggage, passports, hotels, and exploration" },
  { id: "transportation", name: "Transportation", description: "Vehicles, flights, logistics routes, and navigation" },
  { id: "food", name: "Food & Restaurants", description: "Dining, beverages, kitchenware, and cooking" },
  { id: "nature", name: "Nature & Environment", description: "Ecology, flora, fauna, and green energy" },
  { id: "sports", name: "Sports & Fitness", description: "Athletics, exercise, training, and competition" },
  { id: "media", name: "Media & Entertainment", description: "Audio, video playback, streaming, and broadcasting" },
  { id: "photography", name: "Photography", description: "Cameras, lenses, apertures, and lighting" },
  { id: "construction", name: "Construction & Tools", description: "Building, architecture, hardware, and engineering" },
  { id: "logistics", name: "Logistics & Freight", description: "Supply chains, shipping containers, and tracking" },
  { id: "weather", name: "Weather & Climate", description: "Atmospheric conditions, temperature, and forecasts" },
  { id: "gaming", name: "Gaming", description: "Game controllers, arcade icons, dice, and gameplay" },
  { id: "science", name: "Science", description: "Laboratory equipment, chemistry, atoms, and formulas" },
  { id: "space", name: "Space & Astronomy", description: "Rockets, celestial bodies, orbits, and satellites" },
  { id: "miscellaneous", name: "Miscellaneous", description: "General multipurpose symbols and utilities" },
];

export function getCategoryById(id: IconCategorySlug): IconCategory | undefined {
  return ALL_ICON_CATEGORIES.find((c: IconCategory) => c.id === id);
}
