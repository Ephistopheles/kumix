"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
    );
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoMark}>
          <Image
            src="/favicon.svg"
            alt="Kumix Logo"
            width={24}
            height={24}
          />
        </span>
        Kumix
      </Link>
      <button
        className={styles.searchTrigger}
        onClick={openPalette}
        aria-label="Search tools"
      >
        <Search size={14} />
        <span className={styles.searchLabel}>Search tools...</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </button>
    </header>
  );
}
