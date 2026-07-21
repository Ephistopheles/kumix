"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  generatePalette,
} from "@/shared/utils";
import { useToast } from "@/shared/ui/ToastProvider";
import styles from "./ColorPicker.module.css";

const RECENT_KEY = "kumix-recent-colors";
const MAX_RECENT = 12;

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecent(colors: string[]) {
  try {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(colors.slice(0, MAX_RECENT)),
    );
  } catch {}
}

export function ColorPicker() {
  const [hex, setHex] = useState("#a89bff");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setRecentColors(loadRecent());
  }, []);

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo(() => rgbToHsv(rgb), [rgb]);
  const palettes = useMemo(() => generatePalette(hex), [hex]);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hsvStr = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

  const addToRecent = useCallback((color: string) => {
    setRecentColors((prev) => {
      const next = [color, ...prev.filter((c) => c !== color)].slice(
        0,
        MAX_RECENT,
      );
      saveRecent(next);
      return next;
    });
  }, []);

  const handleColorChange = useCallback(
    (newHex: string) => {
      setHex(newHex);
      addToRecent(newHex);
    },
    [addToRecent],
  );

  const handleHexInput = useCallback(
    (value: string) => {
      const cleaned = value.startsWith("#") ? value : `#${value}`;
      if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
        handleColorChange(cleaned.toLowerCase());
      } else {
        setHex(cleaned);
      }
    },
    [handleColorChange],
  );

  const copyValue = useCallback(
    (value: string, field: string) => {
      navigator.clipboard.writeText(value);
      setCopiedField(field);
      toast("Copied");
      setTimeout(() => setCopiedField(null), 2000);
    },
    [toast],
  );

  const values = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: rgbStr },
    { label: "HSL", value: hslStr },
    { label: "HSV", value: hsvStr },
  ];

  return (
    <div className={styles.workspace}>
      <div className={styles.pickerArea}>
        <input
          type="color"
          className={styles.colorInput}
          value={hex}
          onChange={(e) => handleColorChange(e.target.value)}
          aria-label="Color picker"
        />
        <div className={styles.values}>
          {values.map(({ label, value }) => (
            <div key={label} className={styles.valueRow}>
              <span className={styles.valueLabel}>{label}</span>
              {label === "HEX" ? (
                <input
                  className={styles.valueInput}
                  value={hex}
                  onChange={(e) => handleHexInput(e.target.value)}
                  aria-label="HEX value"
                  spellCheck={false}
                />
              ) : (
                <input
                  className={styles.valueInput}
                  value={value}
                  readOnly
                  aria-label={`${label} value`}
                />
              )}
              <button
                className={styles.copyBtn}
                onClick={() => copyValue(value, label)}
                aria-label={`Copy ${label}`}
              >
                {copiedField === label ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {recentColors.length > 0 && (
        <div className={styles.recentSection}>
          <span className={styles.recentTitle}>Recent colors</span>
          <div className={styles.recentColors}>
            {recentColors.map((color) => (
              <button
                key={color}
                className={styles.recentSwatch}
                style={{ background: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.paletteSection}>
        <h3 className={styles.paletteTitle}>Palettes</h3>
        {palettes.map((palette) => (
          <div key={palette.name} className={styles.paletteGroup}>
            <span className={styles.paletteGroupName}>{palette.name}</span>
            <div className={styles.paletteColors}>
              {palette.colors.map((color, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                  <button
                    className={styles.paletteSwatch}
                    style={{ background: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select ${color}`}
                  />
                  <span className={styles.paletteSwatchLabel}>{color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
