"use client";

import { useState, useCallback } from "react";
import {
  FileText,
  ChevronUp,
  ChevronDown,
  X,
  Merge,
  Download,
  Loader2,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadBlob } from "@/shared/utils/download";
import styles from "./MergePdf.module.css";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      const pdfs = newFiles.filter((f) => f.type === "application/pdf");
      if (pdfs.length < newFiles.length) {
        toast("Some files were skipped — only PDFs are accepted", "warning");
      }
      setFiles((prev) => [...prev, ...pdfs]);
      setMergedBlob(null);
    },
    [toast],
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedBlob(null);
  }, []);

  const moveFile = useCallback((index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setMergedBlob(null);
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setMergedBlob(blob);
      toast("PDFs merged successfully");
    } catch {
      toast(
        "Failed to merge PDFs. Some files may be corrupted or use an unsupported format.",
        "error",
      );
    } finally {
      setMerging(false);
    }
  }, [files, toast]);

  const handleDownload = useCallback(() => {
    if (!mergedBlob) return;
    downloadBlob(mergedBlob, "merged.pdf");
  }, [mergedBlob]);

  const handleClear = useCallback(() => {
    setFiles([]);
    setMergedBlob(null);
  }, []);

  return (
    <div>
      <Dropzone
        accept=".pdf,application/pdf"
        multiple
        label="Drop PDF files here or click to browse"
        hint="You can add multiple PDFs at once"
        onFiles={handleFiles}
      />

      {files.length > 0 && (
        <>
          <div className={styles.fileList} style={{ marginTop: 24 }}>
            {files.map((file, i) => (
              <div key={`${file.name}-${i}`} className={styles.fileItem}>
                <div className={styles.fileIcon}>
                  <FileText size={18} />
                </div>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{formatSize(file.size)}</div>
                </div>
                <div className={styles.fileActions}>
                  <button
                    className={styles.iconBtn}
                    onClick={() => moveFile(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => moveFile(i, 1)}
                    disabled={i === files.length - 1}
                    aria-label="Move down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions} style={{ marginTop: 16 }}>
            {merging ? (
              <div className={styles.processing}>
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Merging PDFs...
              </div>
            ) : mergedBlob ? (
              <Button onClick={handleDownload}>
                <Download size={14} />
                Download Merged PDF
              </Button>
            ) : (
              <Button onClick={handleMerge} disabled={files.length < 2}>
                <Merge size={14} />
                Merge {files.length} PDFs
              </Button>
            )}
            <span className={styles.status}>
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              style={{ marginLeft: "auto" }}
            >
              Clear all
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
