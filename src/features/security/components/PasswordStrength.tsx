"use client";

import { useState, useMemo } from "react";
import { Eye, EyeOff, ShieldCheck, ShieldAlert } from "lucide-react";
import styles from "./PasswordStrength.module.css";

type StrengthLevel = "very-weak" | "weak" | "fair" | "strong" | "very-strong";

type Analysis = {
  score: number;
  level: StrengthLevel;
  label: string;
  entropy: number;
  suggestions: string[];
  checks: { label: string; passed: boolean }[];
  crackTime: string;
};

function estimateCrackTime(entropy: number): string {
  const guessesPerSecond = 1e10;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365 * 1000)
    return `${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 1e6)
    return `${Math.round(seconds / (86400 * 365 * 1000))}k years`;
  return "Millions of years";
}

function analyzePassword(password: string): Analysis {
  const checks = [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "At least 12 characters", passed: password.length >= 12 },
    { label: "Contains lowercase", passed: /[a-z]/.test(password) },
    { label: "Contains uppercase", passed: /[A-Z]/.test(password) },
    { label: "Contains numbers", passed: /[0-9]/.test(password) },
    { label: "Contains symbols", passed: /[^a-zA-Z0-9]/.test(password) },
    {
      label: "No common patterns",
      passed: !/(.)\1{2,}|^(123|abc|qwerty|password)/i.test(password),
    },
    {
      label: "No sequential characters",
      passed: !/abc|bcd|cde|def|123|234|345|456|567|678|789/i.test(password),
    },
  ];

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

  const entropy = password.length * Math.log2(poolSize || 1);
  const passedChecks = checks.filter((c) => c.passed).length;

  let score: number;
  let level: StrengthLevel;
  let label: string;

  if (entropy < 28 || passedChecks < 3) {
    score = 1;
    level = "very-weak";
    label = "Very Weak";
  } else if (entropy < 36 || passedChecks < 4) {
    score = 2;
    level = "weak";
    label = "Weak";
  } else if (entropy < 50 || passedChecks < 5) {
    score = 3;
    level = "fair";
    label = "Fair";
  } else if (entropy < 65 || passedChecks < 7) {
    score = 4;
    level = "strong";
    label = "Strong";
  } else {
    score = 5;
    level = "very-strong";
    label = "Very Strong";
  }

  const suggestions: string[] = [];
  if (password.length < 12) suggestions.push("Use at least 12 characters");
  if (!/[A-Z]/.test(password)) suggestions.push("Add uppercase letters");
  if (!/[0-9]/.test(password)) suggestions.push("Add numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push("Add symbols (!@#$%)");
  if (/(.)\1{2,}/.test(password)) suggestions.push("Avoid repeated characters");

  return {
    score,
    level,
    label,
    entropy: Math.round(entropy),
    suggestions,
    checks,
    crackTime: estimateCrackTime(entropy),
  };
}

export function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return null;
    return analyzePassword(password);
  }, [password]);

  return (
    <div className={styles.workspace}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to check..."
          aria-label="Password to check"
          autoComplete="off"
        />
        <button
          className={styles.toggleBtn}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {analysis && (
        <>
          <div className={styles.meter}>
            <div className={styles.meterTrack}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.meterSegment} ${i < analysis.score ? styles[analysis.level] : ""}`}
                />
              ))}
            </div>
            <div className={styles.meterInfo}>
              <span
                className={`${styles.meterLabel} ${styles[analysis.level]}`}
              >
                {analysis.score >= 4 ? (
                  <ShieldCheck size={14} />
                ) : (
                  <ShieldAlert size={14} />
                )}
                {analysis.label}
              </span>
              <span className={styles.entropy}>
                {analysis.entropy} bits of entropy
              </span>
            </div>
          </div>

          <div className={styles.crackTime}>
            Time to crack: <strong>{analysis.crackTime}</strong>
          </div>

          <div className={styles.checks}>
            {analysis.checks.map((check) => (
              <div
                key={check.label}
                className={`${styles.checkItem} ${check.passed ? styles.checkPassed : styles.checkFailed}`}
              >
                <span className={styles.checkIndicator} />
                {check.label}
              </div>
            ))}
          </div>

          {analysis.suggestions.length > 0 && (
            <div className={styles.suggestions}>
              <span className={styles.suggestionsTitle}>Suggestions</span>
              <ul className={styles.suggestionsList}>
                {analysis.suggestions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
