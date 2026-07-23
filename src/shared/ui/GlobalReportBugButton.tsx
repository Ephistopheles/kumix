"use client";

import { Bug } from "lucide-react";
import styles from "./GlobalReportBugButton.module.css";

const DEFAULT_REPORT_URL =
  "https://github.com/Ephistopheles/kumix/issues/new/choose";

export function GlobalReportBugButton() {
  const reportUrl = DEFAULT_REPORT_URL;

  return (
    <a
      href={reportUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.fab}
      aria-label="Report bug"
      title="Report bug"
    >
      <Bug size={18} />
      <span>Report bug</span>
    </a>
  );
}
