"use client";

import { useState, useCallback } from "react";
import {
  Wand2,
  Minimize2,
  CheckCircle2,
  XCircle,
  Download,
  Upload,
  Trash2,
} from "lucide-react";
import YAML from "yaml";
import { Button, CopyButton, Toggle, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadText } from "@/shared/utils/download";
import styles from "./YamlFormatter.module.css";

export function YamlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [wrapLines, setWrapLines] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  const validate = useCallback(
    (text: string): { valid: boolean; error?: string } => {
      if (!text.trim()) return { valid: true };
      try {
        YAML.parse(text);
        return { valid: true };
      } catch (e) {
        return { valid: false, error: (e as Error).message };
      }
    },
    [],
  );

  const validation = validate(input);

  const handleBeautify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = YAML.parse(input);
      const beautified = YAML.stringify(parsed, {
        indent: 2,
        lineWidth: 80,
      }).trimEnd();
      setOutput(beautified);
      toast("YAML beautified");
    } catch {
      toast("Invalid YAML — cannot beautify", "error");
    }
  }, [input, toast]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = YAML.parse(input);
      const minified = YAML.stringify(parsed, {
        collectionStyle: "flow",
        flowCollectionPadding: false,
        lineWidth: 0,
      })
        .replace(/\n+/g, "")
        .trim();
      setOutput(minified);
      toast("YAML minified");
    } catch {
      toast("Invalid YAML — cannot minify", "error");
    }
  }, [input, toast]);

  const handleFileUpload = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
    };
    reader.readAsText(file);
  }, []);

  const handleDownload = useCallback(() => {
    if (!output.trim()) return;
    downloadText(output, "formatted.yaml");
    toast("YAML downloaded");
  }, [output, toast]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <div className={styles.workspace}>
      {showUpload && (
        <Dropzone
          accept=".yaml,.yml,application/x-yaml"
          label="Drop a YAML file here or click to browse"
          hint="Supports .yaml and .yml files"
          onFiles={handleFileUpload}
          compact
        />
      )}

      <div className={styles.options}>
        <Toggle
          checked={wrapLines}
          onChange={setWrapLines}
          label="Line wrapping"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Upload size={14} />
          {showUpload ? "Hide upload" : "Upload file"}
        </Button>
      </div>

      <div className={styles.editorWrapper}>
        <div className={styles.editorPanel}>
          <span className={styles.editorLabel}>Input</span>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your YAML here...\n\nexample: value"
            spellCheck={false}
            style={{
              whiteSpace: wrapLines ? "pre-wrap" : "pre",
              overflowX: wrapLines ? "hidden" : "auto",
            }}
            aria-label="YAML input"
          />
        </div>
        <div className={styles.editorPanel}>
          <span className={styles.editorLabel}>Output</span>
          <textarea
            className={styles.textarea}
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            spellCheck={false}
            style={{
              whiteSpace: wrapLines ? "pre-wrap" : "pre",
              overflowX: wrapLines ? "hidden" : "auto",
            }}
            aria-label="YAML output"
          />
        </div>
      </div>

      {input.trim() && (
        <div
          className={`${styles.status} ${validation.valid ? styles.valid : styles.invalid}`}
        >
          {validation.valid ? (
            <>
              <CheckCircle2 size={14} /> Valid YAML
            </>
          ) : (
            <>
              <XCircle size={14} /> Invalid YAML — {validation.error}
            </>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={handleBeautify} disabled={!input.trim()}>
          <Wand2 size={14} />
          Beautify
        </Button>
        <Button
          variant="secondary"
          onClick={handleMinify}
          disabled={!input.trim()}
        >
          <Minimize2 size={14} />
          Minify
        </Button>
        <div className={styles.secondaryActions}>
          {output && <CopyButton text={output} />}
          {output && (
            <Button variant="secondary" size="sm" onClick={handleDownload}>
              <Download size={14} />
              Download
            </Button>
          )}
          {(input || output) && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 size={14} />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
