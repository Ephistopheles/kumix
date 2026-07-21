"use client";

import { useState, useCallback } from "react";
import { ImageIcon, Download, RefreshCw, Trash2, X } from "lucide-react";
import { Button, Dropzone } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadBlob } from "@/shared/utils/download";
import styles from "./PngConverter.module.css";

type ImageFile = {
  id: string;
  file: File;
  previewUrl: string;
  converted: boolean;
  pngBlob?: Blob;
  pngUrl?: string;
};

function convertToPng(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Conversion failed"));
      }, "image/png");
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

function getNameWithoutExt(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

export function PngConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const { toast } = useToast();

  const handleFiles = useCallback((files: File[]) => {
    const accepted = files.filter((f) =>
      ["image/jpeg", "image/jpg", "image/webp", "image/avif"].includes(f.type),
    );
    const newImages: ImageFile[] = accepted.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      converted: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.previewUrl);
        if (img.pngUrl) URL.revokeObjectURL(img.pngUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleConvert = useCallback(async () => {
    setConverting(true);
    try {
      const updated = await Promise.all(
        images.map(async (img) => {
          if (img.converted) return img;
          const pngBlob = await convertToPng(img.file);
          return {
            ...img,
            converted: true,
            pngBlob,
            pngUrl: URL.createObjectURL(pngBlob),
          };
        }),
      );
      setImages(updated);
      toast(`${updated.filter((i) => i.converted).length} image(s) converted`);
    } catch {
      toast("Some images could not be converted", "error");
    } finally {
      setConverting(false);
    }
  }, [images, toast]);

  const handleDownload = useCallback((img: ImageFile) => {
    if (!img.pngBlob) return;
    downloadBlob(img.pngBlob, `${getNameWithoutExt(img.file.name)}.png`);
  }, []);

  const handleDownloadAll = useCallback(() => {
    images
      .filter((img) => img.pngBlob)
      .forEach((img) => {
        downloadBlob(img.pngBlob!, `${getNameWithoutExt(img.file.name)}.png`);
      });
  }, [images]);

  const handleClear = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.pngUrl) URL.revokeObjectURL(img.pngUrl);
    });
    setImages([]);
  }, [images]);

  const allConverted = images.length > 0 && images.every((i) => i.converted);
  const hasUnconverted = images.some((i) => !i.converted);

  return (
    <div>
      <Dropzone
        accept=".jpg,.jpeg,.webp,.avif,image/jpeg,image/webp,image/avif"
        multiple
        label="Drop images here or click to browse"
        hint="Supports JPG, JPEG, WEBP and AVIF"
        onFiles={handleFiles}
      />

      {images.length > 0 && (
        <>
          <div className={styles.grid}>
            {images.map((img) => (
              <div key={img.id} className={styles.card}>
                <div className={styles.preview}>
                  <img
                    src={img.pngUrl || img.previewUrl}
                    alt={img.file.name}
                    loading="lazy"
                  />
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeImage(img.id)}
                    aria-label={`Remove ${img.file.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardName}>{img.file.name}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      className={`${styles.statusBadge} ${img.converted ? styles.converted : styles.pending}`}
                    >
                      {img.converted ? "Converted" : "Pending"}
                    </span>
                    {img.converted && (
                      <button
                        className={styles.removeBtn}
                        style={{
                          position: "static",
                          opacity: 1,
                          background: "var(--color-accent)",
                          width: 28,
                          height: 28,
                        }}
                        onClick={() => handleDownload(img)}
                        aria-label={`Download ${img.file.name}`}
                      >
                        <Download size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            {hasUnconverted && (
              <Button onClick={handleConvert} disabled={converting}>
                <RefreshCw size={14} />
                {converting
                  ? "Converting..."
                  : `Convert ${images.filter((i) => !i.converted).length} image(s)`}
              </Button>
            )}
            {allConverted && (
              <Button onClick={handleDownloadAll}>
                <Download size={14} />
                Download All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              style={{ marginLeft: "auto" }}
            >
              <Trash2 size={14} />
              Clear all
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
