"use client";

import { useState, useCallback } from "react";
import { FileSpreadsheet, Download, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { Button, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadBlob } from "@/shared/utils/download";
import styles from "./CsvToExcel.module.css";

export function CsvToExcel() {
  const [csvContent, setCsvContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string[][]>([]);
  const { toast } = useToast();

  const parsePreview = useCallback((text: string) => {
    const lines = text.split("\n").filter((l) => l.trim());
    const rows = lines.slice(0, 10).map((line) => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    });
    setPreview(rows);
  }, []);

  const handleFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvContent(text);
        setFileName(file.name.replace(/\.[^.]+$/, ""));
        parsePreview(text);
      };
      reader.readAsText(file);
    },
    [parsePreview],
  );

  const handleTextChange = useCallback(
    (text: string) => {
      setCsvContent(text);
      parsePreview(text);
    },
    [parsePreview],
  );

  const handleConvert = useCallback(() => {
    if (!csvContent.trim()) return;
    try {
      const workbook = XLSX.read(csvContent, { type: "string" });
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      downloadBlob(blob, `${fileName || "converted"}.xlsx`);
      toast("Excel file downloaded");
    } catch {
      toast("Failed to convert CSV", "error");
    }
  }, [csvContent, fileName, toast]);

  return (
    <div className={styles.workspace}>
      <Dropzone
        accept=".csv,text/csv"
        label="Drop a CSV file here or click to browse"
        hint="Supports .csv files"
        onFiles={handleFiles}
        compact
      />

      <div className={styles.editorSection}>
        <label className={styles.label}>Or paste CSV content</label>
        <textarea
          className={styles.textarea}
          value={csvContent}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={
            "Name,Email,Age\nJohn,john@example.com,30\nJane,jane@example.com,25"
          }
          spellCheck={false}
          aria-label="CSV content"
        />
      </div>

      {preview.length > 0 && (
        <div className={styles.previewSection}>
          <span className={styles.label}>Preview (first 10 rows)</span>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                {preview.map((row, i) => (
                  <tr
                    key={i}
                    className={i === 0 ? styles.headerRow : undefined}
                  >
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={handleConvert} disabled={!csvContent.trim()}>
          <FileSpreadsheet size={14} />
          Convert to Excel
        </Button>
      </div>
    </div>
  );
}
