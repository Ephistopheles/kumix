"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { TOOLS } from "@/shared/constants";
import styles from "./CommandPalette.module.css";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query.trim()) return [...TOOLS];
    const q = query.toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/tools/${slug}`);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        navigate(filtered[activeIndex].slug);
      }
    },
    [filtered, activeIndex, navigate],
  );

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div
        className={styles.palette}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Command palette"
      >
        <div className={styles.searchWrapper}>
          <Search size={18} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search tools"
          />
        </div>
        <div className={styles.results} role="listbox">
          {filtered.length === 0 ? (
            <div className={styles.empty}>No tools found</div>
          ) : (
            filtered.map((tool, i) => (
              <div
                key={tool.slug}
                className={styles.resultItem}
                data-active={i === activeIndex}
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => navigate(tool.slug)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className={styles.resultIcon}>
                  <tool.icon size={18} />
                </div>
                <div>
                  <div className={styles.resultName}>{tool.name}</div>
                  <div className={styles.resultDesc}>{tool.description}</div>
                </div>
                <span className={styles.resultCategory}>
                  {tool.categoryLabel}
                </span>
              </div>
            ))
          )}
        </div>
        <div className={styles.shortcutHint}>
          <kbd className={styles.kbd}>↑</kbd>
          <kbd className={styles.kbd}>↓</kbd>
          navigate
          <kbd className={styles.kbd}>↵</kbd>
          select
          <kbd className={styles.kbd}>esc</kbd>
          close
        </div>
      </div>
    </div>
  );
}
