import type { ThemeSettings, SectionKey } from "./types";

export function visibleSections(theme: ThemeSettings): SectionKey[] {
  return theme.sectionOrder.filter((key) => !theme.hiddenSections.includes(key));
}

export function fontClassName(fontPairing: ThemeSettings["fontPairing"]): string {
  if (fontPairing === "serif") return "font-[family-name:var(--font-source-serif)]";
  if (fontPairing === "mono") return "font-[family-name:var(--font-geist-mono)]";
  return "font-[family-name:var(--font-geist-sans)]";
}
