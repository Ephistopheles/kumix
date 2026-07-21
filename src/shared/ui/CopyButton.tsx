"use client";

import { Check, Copy } from "lucide-react";
import { useCopy } from "@/shared/hooks";
import styles from "./Button.module.css";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      className={`${styles.button} ${styles.secondary} ${styles.sm}`}
      onClick={() => copy(text)}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label}
    </button>
  );
}
