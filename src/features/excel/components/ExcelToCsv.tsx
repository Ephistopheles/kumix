"use client";

import { useState, useCallback, useMemo } from "react";
import { FileSpreadsheet, Download, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import { Button, Dropzone, CopyButton } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadText } from "@/shared/utils/download";
import styles from "./ExcelToCsv.module.css";

export function ExcelToCsv() {
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [fileName, setFileName] = useState("");
  const [selectedSheet, setSelectedSheet] = useState("");
  const { toast } = useToast();

  const handleFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const wb = XLSX.read(data, { type: "array" });
          setWorkbook(wb);
          setFileName(file.name);
          setSelectedSheet(wb.SheetNames[0] || "");
          toast("Spreadsheet loaded");
        } catch {
          toast(
            "Failed to read spreadsheet. The file may be corrupted or use an unsupported format.",
            "error",
          );
        }
      };
      reader.readAsArrayBuffer(file);
    },
    [toast],
  );

  const csvOutput = useMemo(() => {
    if (!workbook || !selectedSheet) return "";
    const sheet = workbook.Sheets[selectedSheet];
    if (!sheet) return "";
    return XLSX.utils.sheet_to_csv(sheet);
  }, [workbook, selectedSheet]);

  const handleDownload = useCallback(() => {
    if (!csvOutput) return;
    const name = fileName.replace(/\.[^.]+$/, "") || "output";
    downloadText(csvOutput, `${name}.csv`, "text/csv");
  }, [csvOutput, fileName]);

  const handleClear = useCallback(() => {
    setWorkbook(null);
    setFileName("");
    setSelectedSheet("");
  }, []);

  return (
    <div className={styles.workspace}>
      {!workbook ? (
        <Dropzone
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          label="Drop an Excel file here or click to browse"
          hint="Supports XLSX and XLS"
          onFiles={handleFiles}
        />
      ) : (
        <>
          <div className={styles.fileInfo}>
            <FileSpreadsheet size={18} />
            {fileName}
          </div>

          {workbook.SheetNames.length > 1 && (
            <div className={styles.controls}>
              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel} htmlFor="sheet-select">
                  Worksheet
                </label>
                <select
                  id="sheet-select"
                  className={styles.select}
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value)}
                >
                  {workbook.SheetNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {csvOutput && (
            <div className={styles.previewWrapper}>
              <span className={styles.previewLabel}>Preview</span>
              <div className={styles.preview}>{csvOutput}</div>
            </div>
          )}

          <div className={styles.actions}>
            <Button onClick={handleDownload} disabled={!csvOutput}>
              <Download size={14} />
              Download CSV
            </Button>
            {csvOutput && <CopyButton text={csvOutput} />}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              style={{ marginLeft: "auto" }}
            >
              <Trash2 size={14} />
              Clear
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
