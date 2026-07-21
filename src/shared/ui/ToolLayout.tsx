import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getRelatedTools } from "@/shared/constants";
import { Badge } from "./Badge";
import type { ToolBadge } from "@/shared/types";
import styles from "./ToolLayout.module.css";

type Breadcrumb = { label: string; href?: string };

type ToolLayoutProps = {
  title: string;
  description: string;
  badge?: ToolBadge;
  breadcrumbs: Breadcrumb[];
  slug: string;
  children: React.ReactNode;
};

export function ToolLayout({
  title,
  description,
  badge,
  breadcrumbs,
  slug,
  children,
}: ToolLayoutProps) {
  const related = getRelatedTools(slug);

  return (
    <div className={styles.layout}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: "contents" }}>
            <ChevronRight size={14} className={styles.separator} />
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span className={styles.current}>{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          {badge && <Badge variant={badge} />}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.content}>{children}</div>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Related Tools</h2>
          <div className={styles.relatedGrid}>
            {related.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedIcon}>
                  <tool.icon size={20} />
                </div>
                <div>
                  <div className={styles.relatedName}>{tool.name}</div>
                  <div className={styles.relatedDesc}>{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
