"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          <span className={styles.brand}>Kumix</span> © {currentYear}
        </p>
        <nav className={styles.nav} aria-label="Footer">
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <a
            href="https://github.com/Ephistopheles/kumix"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
