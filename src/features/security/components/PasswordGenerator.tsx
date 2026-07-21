"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { Button, Toggle, Slider } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import styles from "./PasswordGenerator.module.css";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AMBIGUOUS = "Il1O0o";

type Options = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
};

function generatePassword(options: Options): string {
  let charset = "";
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;

  if (!charset) return "";

  if (options.excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

function getStrength(
  password: string,
  options: Options,
): { level: number; label: string } {
  if (!password) return { level: 0, label: "" };

  let poolSize = 0;
  if (options.uppercase) poolSize += 26;
  if (options.lowercase) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += CHARSETS.symbols.length;
  if (options.excludeAmbiguous)
    poolSize = Math.max(poolSize - AMBIGUOUS.length, 1);

  const entropy = password.length * Math.log2(poolSize);

  if (entropy < 40) return { level: 1, label: "Weak" };
  if (entropy < 60) return { level: 2, label: "Fair" };
  if (entropy < 80) return { level: 3, label: "Strong" };
  return { level: 4, label: "Very strong" };
}

const STRENGTH_CLASSES = [
  "",
  styles.weak,
  styles.fair,
  styles.strong,
  styles.veryStrong,
];
const STRENGTH_COLORS = ["", "#e96a6a", "#f5b942", "#69c779", "#2d8a3e"];

export function PasswordGenerator() {
  const [options, setOptions] = useState<Options>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generate = useCallback(() => {
    setPassword(generatePassword(options));
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const strength = useMemo(
    () => getStrength(password, options),
    [password, options],
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast("Password copied");
    setTimeout(() => setCopied(false), 2000);
  }, [password, toast]);

  const updateOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const hasAnyCharset =
    options.uppercase ||
    options.lowercase ||
    options.numbers ||
    options.symbols;

  return (
    <div className={styles.workspace}>
      <div className={styles.passwordDisplay}>
        <span className={styles.passwordText}>
          {password || "Select at least one character type"}
        </span>
        <div className={styles.passwordActions}>
          <button
            className={styles.iconBtn}
            onClick={handleCopy}
            aria-label="Copy password"
            disabled={!password}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <button
            className={styles.iconBtn}
            onClick={generate}
            aria-label="Generate new password"
            disabled={!hasAnyCharset}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {password && (
        <div className={styles.strengthBar}>
          <div className={styles.strengthTrack}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={styles.strengthSegment}
                style={{
                  background:
                    i <= strength.level
                      ? STRENGTH_COLORS[strength.level]
                      : undefined,
                }}
              />
            ))}
          </div>
          <span
            className={`${styles.strengthLabel} ${STRENGTH_CLASSES[strength.level]}`}
          >
            {strength.label}
          </span>
        </div>
      )}

      <div className={styles.options}>
        <Slider
          label="Length"
          value={options.length}
          min={4}
          max={128}
          onChange={(v) => updateOption("length", v)}
          formatValue={(v) => `${v} characters`}
        />
        <Toggle
          checked={options.uppercase}
          onChange={(v) => updateOption("uppercase", v)}
          label="Uppercase (A-Z)"
        />
        <Toggle
          checked={options.lowercase}
          onChange={(v) => updateOption("lowercase", v)}
          label="Lowercase (a-z)"
        />
        <Toggle
          checked={options.numbers}
          onChange={(v) => updateOption("numbers", v)}
          label="Numbers (0-9)"
        />
        <Toggle
          checked={options.symbols}
          onChange={(v) => updateOption("symbols", v)}
          label="Symbols (!@#$...)"
        />
        <Toggle
          checked={options.excludeAmbiguous}
          onChange={(v) => updateOption("excludeAmbiguous", v)}
          label="Exclude ambiguous (I, l, 1, O, 0)"
        />
      </div>

      <div className={styles.actions}>
        <Button onClick={generate} fullWidth disabled={!hasAnyCharset}>
          <RefreshCw size={14} />
          Generate Password
        </Button>
      </div>
    </div>
  );
}
