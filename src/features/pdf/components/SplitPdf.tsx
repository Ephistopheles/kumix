"use client";

import { useState, useCallback } from "react";
import { FileText, Scissors, Download, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadBlob } from "@/shared/utils/download";
import styles from "./SplitPdf.module.css";

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [rangeInput, setRangeInput] = useState("");
  const { toast } = useToast();

  const handleFile = useCallback(
    async (files: File[]) => {
      const pdf = files.find((f) => f.type === "application/pdf");
      if (!pdf) {
        toast("Please upload a PDF file", "error");
        return;
      }
      try {
        const buffer = await pdf.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        setPageCount(doc.getPageCount());
        setFile(pdf);
        setRangeInput(`1-${doc.getPageCount()}`);
      } catch {
        toast("Failed to read PDF", "error");
      }
    },
    [toast],
  );

  const parseRanges = useCallback((input: string, max: number): number[][] => {
    const ranges: number[][] = [];
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        if (start >= 1 && end <= max && start <= end) {
          ranges.push(
            Array.from({ length: end - start + 1 }, (_, i) => start + i),
          );
        }
      } else {
        const n = Number(part);
        if (n >= 1 && n <= max) {
          ranges.push([n]);
        }
      }
    }
    return ranges;
  }, []);

  const handleSplit = useCallback(async () => {
    if (!file) return;
    const ranges = parseRanges(rangeInput, pageCount);
    if (ranges.length === 0) {
      toast("Invalid page range", "error");
      return;
    }

    setSplitting(true);
    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);

      for (let i = 0; i < ranges.length; i++) {
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(
          srcDoc,
          ranges[i].map((p) => p - 1),
        );
        for (const page of pages) {
          newDoc.addPage(page);
        }
        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
          type: "application/pdf",
        });
        const label =
          ranges[i].length === 1
            ? `page-${ranges[i][0]}`
            : `pages-${ranges[i][0]}-${ranges[i][ranges[i].length - 1]}`;
        downloadBlob(blob, `split-${label}.pdf`);
      }

      toast(`Split into ${ranges.length} file${ranges.length > 1 ? "s" : ""}`);
    } catch {
      toast("Failed to split PDF", "error");
    } finally {
      setSplitting(false);
    }
  }, [file, rangeInput, pageCount, parseRanges, toast]);

  return (
    <div className={styles.workspace}>
      <Dropzone
        accept=".pdf,application/pdf"
        label="Drop a PDF file here or click to browse"
        hint="Supports .pdf files"
        onFiles={handleFile}
        compact
      />

      {file && (
        <div className={styles.fileInfo}>
          <FileText size={18} />
          <div className={styles.fileDetails}>
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.pageCount}>{pageCount} pages</span>
          </div>
        </div>
      )}

      {file && (
        <div className={styles.rangeSection}>
          <label className={styles.label} htmlFor="page-range">
            Page ranges (e.g. 1-3, 5, 7-10)
          </label>
          <input
            id="page-range"
            className={styles.input}
            value={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            placeholder="1-3, 5, 7-10"
          />
          <p className={styles.hint}>
            Each comma-separated range will produce a separate PDF file.
          </p>
        </div>
      )}

      {splitting && (
        <div className={styles.processing}>
          <Loader2 size={16} className={styles.spin} />
          Splitting PDF...
        </div>
      )}

      <div className={styles.actions}>
        <Button
          onClick={handleSplit}
          disabled={!file || splitting || !rangeInput.trim()}
        >
          <Scissors size={14} />
          Split PDF
        </Button>
      </div>
    </div>
  );
}
