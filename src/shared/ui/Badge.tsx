import type { ToolBadge } from "@/shared/types";
import styles from "./Badge.module.css";

type BadgeProps = {
  variant: ToolBadge;
};

const BADGE_LABELS: Record<ToolBadge, string> = {
  new: "New",
  beta: "Beta",
  "coming-soon": "Soon",
  updated: "Updated",
};

export function Badge({ variant }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {BADGE_LABELS[variant]}
    </span>
  );
}
