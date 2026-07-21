"use client";

import { useState, useMemo, useCallback } from "react";
import { Download, Trash2 } from "lucide-react";
import { Button, CopyButton, Toggle } from "@/shared/ui";
import { downloadText } from "@/shared/utils/download";
import styles from "./RemoveDuplicateLines.module.css";

export function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);

  const { output, removed } = useMemo(() => {
    if (!input.trim()) return { output: "", removed: 0 };
    const lines = input.split("\n");
    const seen = new Set<string>();
    let removedCount = 0;
    const unique = lines.filter((line) => {
      if (ignoreEmpty && line.trim() === "") return true;
      const key = ignoreCase ? line.toLowerCase() : line;
      if (seen.has(key)) {
        removedCount++;
        return false;
      }
      seen.add(key);
      return true;
    });
    return { output: unique.join("\n"), removed: removedCount };
  }, [input, ignoreCase, ignoreEmpty]);

  const inputLineCount = input ? input.split("\n").length : 0;
  const outputLineCount = output ? output.split("\n").length : 0;

  const handleDownload = useCallback(() => {
    if (!output) return;
    downloadText(output, "unique-lines.txt");
  }, [output]);

  return (
    <div className={styles.workspace}>
      <div className={styles.options}>
        <Toggle
          checked={ignoreCase}
          onChange={setIgnoreCase}
          label="Ignore case"
        />
        <Toggle
          checked={ignoreEmpty}
          onChange={setIgnoreEmpty}
          label="Keep empty lines"
        />
      </div>

      <div className={styles.editorWrapper}>
        <div className={styles.editorPanel}>
          <div className={styles.editorLabel}>
            <span>Input</span>
            {inputLineCount > 0 && (
              <span className={styles.lineCount}>{inputLineCount} lines</span>
            )}
          </div>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            spellCheck={false}
            aria-label="Text input"
          />
        </div>
        <div className={styles.editorPanel}>
          <div className={styles.editorLabel}>
            <span>Result</span>
            {outputLineCount > 0 && (
              <span className={styles.lineCount}>{outputLineCount} lines</span>
            )}
          </div>
          <textarea
            className={styles.textarea}
            value={output}
            readOnly
            placeholder="Unique lines will appear here..."
            spellCheck={false}
            aria-label="Result output"
          />
        </div>
      </div>

      <div className={styles.actions}>
        {output && <CopyButton text={output} />}
        {output && (
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            <Download size={14} />
            Download
          </Button>
        )}
        {input && (
          <Button variant="ghost" size="sm" onClick={() => setInput("")}>
            <Trash2 size={14} />
            Clear
          </Button>
        )}
        {removed > 0 && (
          <span className={styles.stats}>{removed} duplicate(s) removed</span>
        )}
      </div>
    </div>
  );
}
