import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "development"
  | "documents"
  | "images"
  | "excel"
  | "calculators"
  | "text"
  | "web"
  | "security";

export type ToolBadge = "new" | "beta" | "coming-soon" | "updated";

export type Tool = {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: ToolCategory;
  readonly categoryLabel: string;
  readonly icon: LucideIcon;
  readonly badge?: ToolBadge;
  readonly keywords: readonly string[];
};
