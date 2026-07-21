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
import { Button, CopyButton, Toggle, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadText } from "@/shared/utils/download";
import styles from "./XmlFormatter.module.css";

export function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [wrapLines, setWrapLines] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  const validate = useCallback(
    (text: string): { valid: boolean; error?: string } => {
      if (!text.trim()) return { valid: true };
      try {
        const parser = new window.DOMParser();
        const parsed = parser.parseFromString(text, "application/xml");
        const errorNode = parsed.querySelector("parsererror");
        if (errorNode) {
          return {
            valid: false,
            error: errorNode.textContent || "Invalid XML",
          };
        }
        return { valid: true };
      } catch (e) {
        return { valid: false, error: (e as Error).message };
      }
    },
    [],
  );

  const validation = validate(input);

  const formatXml = useCallback((xml: string, indent = "  "): string => {
    let formatted = "";
    let pad = 0;
    const lines = xml.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.match(/^<\/\w/)) {
        pad = Math.max(0, pad - 1);
      }

      formatted += indent.repeat(pad) + trimmed + "\n";

      if (trimmed.match(/^<\w[^>]*[^/]>$/) && !trimmed.startsWith("<?")) {
        pad++;
      }
    }
    return formatted.trimEnd();
  }, []);

  const handleBeautify = useCallback(() => {
    if (!input.trim()) return;
    const { valid } = validate(input);
    if (!valid) {
      toast("Invalid XML — cannot beautify", "error");
      return;
    }
    const beautified = formatXml(input);
    setOutput(beautified);
    toast("XML beautified");
  }, [input, toast, validate, formatXml]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    const { valid } = validate(input);
    if (!valid) {
      toast("Invalid XML — cannot minify", "error");
      return;
    }
    const minified = input
      .replace(/>\s+</g, "><")
      .replace(/\s+/g, " ")
      .replace(/>\s+/g, ">")
      .replace(/\s+</g, "<")
      .trim();
    setOutput(minified);
    toast("XML minified");
  }, [input, toast, validate]);

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
    downloadText(output, "formatted.xml");
    toast("XML downloaded");
  }, [output, toast]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <div className={styles.workspace}>
      {showUpload && (
        <Dropzone
          accept=".xml,application/xml"
          label="Drop an XML file here or click to browse"
          hint="Supports .xml files"
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
            placeholder="Paste your XML here...\n\n<example>value</example>"
            spellCheck={false}
            style={{
              whiteSpace: wrapLines ? "pre-wrap" : "pre",
              overflowX: wrapLines ? "hidden" : "auto",
            }}
            aria-label="XML input"
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
            aria-label="XML output"
          />
        </div>
      </div>

      {input.trim() && (
        <div
          className={`${styles.status} ${validation.valid ? styles.valid : styles.invalid}`}
        >
          {validation.valid ? (
            <>
              <CheckCircle2 size={14} /> Valid XML
            </>
          ) : (
            <>
              <XCircle size={14} /> Invalid XML — {validation.error}
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
