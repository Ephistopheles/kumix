"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/shared/constants";
import { Badge } from "@/shared/ui";
import type { Tool, ToolCategory } from "@/shared/types";
import styles from "./page.module.css";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return TOOLS;
    const q = query.toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  const groupedByCategory = useMemo(() => {
    const groups: Partial<Record<ToolCategory, Tool[]>> = {};
    for (const tool of filtered) {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category]!.push(tool);
    }
    return groups;
  }, [filtered]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          What do you need to{" "}
          <span className={styles.heroHighlight}>do today?</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A unified workspace of professional utilities. Fast, friendly,
          beautiful and invisible.
        </p>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search tools... (e.g. json, pdf, password)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tools"
          />
        </div>
      </section>

      <section className={styles.categories}>
        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            No tools match your search. Try a different term.
          </div>
        ) : (
          Object.entries(groupedByCategory).map(([category, tools]) => (
            <div key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>
                {CATEGORIES[category as ToolCategory]}
              </h2>
              <div className={styles.grid}>
                {tools!.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className={styles.card}
                  >
                    <div className={styles.cardIcon}>
                      <tool.icon size={22} />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardNameRow}>
                        <span className={styles.cardName}>{tool.name}</span>
                        {tool.badge && <Badge variant={tool.badge} />}
                      </div>
                      <div className={styles.cardDesc}>{tool.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
