"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/shared/ui";
import styles from "./WordCounter.module.css";

function countStats(text: string) {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim()).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter((p) => p.trim()).length
    : 0;
  const lines = text ? text.split("\n").length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  const speakingTime = Math.max(1, Math.ceil(words / 130));

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
  };
}

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => countStats(text), [text]);

  const summaryText = `Words: ${stats.words}, Characters: ${stats.characters}, Sentences: ${stats.sentences}, Paragraphs: ${stats.paragraphs}`;

  return (
    <div className={styles.workspace}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        spellCheck={false}
        aria-label="Text input"
      />

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.words.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Words</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.characters.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Characters</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.charactersNoSpaces.toLocaleString()}
          </span>
          <span className={styles.statLabel}>No spaces</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.sentences.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Sentences</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.paragraphs.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Paragraphs</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {stats.lines.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Lines</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>~{stats.readingTime} min</span>
          <span className={styles.statLabel}>Reading time</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>~{stats.speakingTime} min</span>
          <span className={styles.statLabel}>Speaking time</span>
        </div>
      </div>

      {text.trim() && (
        <div className={styles.actions}>
          <CopyButton text={summaryText} />
        </div>
      )}
    </div>
  );
}
