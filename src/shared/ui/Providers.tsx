"use client";

import { type ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { CommandPalette } from "./CommandPalette";
import { GlobalReportBugButton } from "./GlobalReportBugButton";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <CommandPalette />
      <GlobalReportBugButton />
    </ToastProvider>
  );
}
