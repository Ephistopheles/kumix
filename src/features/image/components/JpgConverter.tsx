"use client";

import { useState, useCallback } from "react";
import { Download, X } from "lucide-react";
import { Button, Dropzone, Slider } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import { downloadBlob } from "@/shared/utils/download";
import styles from "./JpgConverter.module.css";

type ImageFile = {
  id: string;
  file: File;
  previewUrl: string;
  converted: boolean;
  jpgBlob?: Blob;
  jpgUrl?: string;
};

function convertToJpg(file: File, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Conversion failed"));
        },
        "image/jpeg",
        quality / 100,
      );
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

function getNameWithoutExt(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

export function JpgConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [quality, setQuality] = useState(85);
  const { toast } = useToast();

  const handleFiles = useCallback((files: File[]) => {
    const accepted = files.filter((f) =>
      [
        "image/png",
        "image/webp",
        "image/avif",
        "image/bmp",
        "image/tiff",
      ].includes(f.type),
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
        if (img.jpgUrl) URL.revokeObjectURL(img.jpgUrl);
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
          const jpgBlob = await convertToJpg(img.file, quality);
          return {
            ...img,
            converted: true,
            jpgBlob,
            jpgUrl: URL.createObjectURL(jpgBlob),
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
  }, [images, quality, toast]);

  const handleDownload = useCallback((img: ImageFile) => {
    if (!img.jpgBlob) return;
    downloadBlob(img.jpgBlob, `${getNameWithoutExt(img.file.name)}.jpg`);
  }, []);

  const handleDownloadAll = useCallback(() => {
    images
      .filter((img) => img.jpgBlob)
      .forEach((img) => {
        downloadBlob(img.jpgBlob!, `${getNameWithoutExt(img.file.name)}.jpg`);
      });
  }, [images]);

  const handleClear = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.jpgUrl) URL.revokeObjectURL(img.jpgUrl);
    });
    setImages([]);
  }, [images]);

  const allConverted = images.length > 0 && images.every((i) => i.converted);
  const hasUnconverted = images.some((i) => !i.converted);

  return (
    <div className={styles.workspace}>
      <Dropzone
        accept=".png,.webp,.avif,.bmp,.tiff,image/png,image/webp,image/avif,image/bmp,image/tiff"
        multiple
        label="Drop images here or click to browse"
        hint="Supports PNG, WEBP, AVIF, BMP and TIFF"
        onFiles={handleFiles}
      />

      <div className={styles.options}>
        <Slider
          label={`Quality: ${quality}%`}
          min={10}
          max={100}
          step={5}
          value={quality}
          onChange={setQuality}
        />
      </div>

      {images.length > 0 && (
        <>
          <div className={styles.grid}>
            {images.map((img) => (
              <div key={img.id} className={styles.card}>
                <div className={styles.preview}>
                  <img
                    src={img.jpgUrl || img.previewUrl}
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
                  <span className={styles.cardName}>{img.file.name}</span>
                  {img.converted && (
                    <button
                      className={styles.downloadBtn}
                      onClick={() => handleDownload(img)}
                      aria-label={`Download ${img.file.name}`}
                    >
                      <Download size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            {hasUnconverted && (
              <Button onClick={handleConvert} disabled={converting}>
                {converting ? "Converting..." : "Convert to JPG"}
              </Button>
            )}
            {allConverted && (
              <Button onClick={handleDownloadAll}>
                <Download size={14} />
                Download All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear All
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
