"use client";

import { useState, useCallback, type DragEvent, useRef } from "react";
import { Upload } from "lucide-react";
import styles from "./Dropzone.module.css";

type DropzoneProps = {
  accept?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
  compact?: boolean;
  onFiles: (files: File[]) => void;
};

export function Dropzone({
  accept,
  multiple = false,
  label = "Drop files here or click to browse",
  hint,
  compact,
  onFiles,
}: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFiles(multiple ? files : [files[0]]);
    },
    [onFiles, multiple],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onFiles(files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [onFiles],
  );

  const cls = [
    styles.dropzone,
    dragging && styles.dragging,
    compact && styles.compact,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cls}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
    >
      <Upload size={32} />
      <span className={styles.label}>{label}</span>
      {hint && <span className={styles.hint}>{hint}</span>}
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}
