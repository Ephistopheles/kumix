"use client";

import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { CopyButton } from "@/shared/ui";
import styles from "./AgeCalculator.module.css";

function calculateAge(birthDate: Date, toDate: Date) {
  let years = toDate.getFullYear() - birthDate.getFullYear();
  let months = toDate.getMonth() - birthDate.getMonth();
  let days = toDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (toDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
  };
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const result = useMemo(() => {
    if (!birthDate || !toDate) return null;
    const birth = new Date(birthDate + "T00:00:00");
    const to = new Date(toDate + "T00:00:00");
    if (isNaN(birth.getTime()) || isNaN(to.getTime())) return null;
    if (birth > to) return null;
    return calculateAge(birth, to);
  }, [birthDate, toDate]);

  const summaryText = result
    ? `${result.years} years, ${result.months} months, ${result.days} days`
    : "";

  return (
    <div className={styles.workspace}>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="birth-date">
            <Calendar size={14} />
            Date of birth
          </label>
          <input
            id="birth-date"
            type="date"
            className={styles.input}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={toDate}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="to-date">
            <Calendar size={14} />
            Calculate to
          </label>
          <input
            id="to-date"
            type="date"
            className={styles.input}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <div className={styles.results}>
          <div className={styles.mainResult}>
            <span className={styles.mainValue}>
              {result.years} <small>years</small> {result.months}{" "}
              <small>months</small> {result.days} <small>days</small>
            </span>
            <CopyButton text={summaryText} />
          </div>

          <div className={styles.grid}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {result.totalDays.toLocaleString()}
              </span>
              <span className={styles.statLabel}>Total days</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {result.totalWeeks.toLocaleString()}
              </span>
              <span className={styles.statLabel}>Total weeks</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {result.totalMonths.toLocaleString()}
              </span>
              <span className={styles.statLabel}>Total months</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {result.totalHours.toLocaleString()}
              </span>
              <span className={styles.statLabel}>Total hours</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {result.totalMinutes.toLocaleString()}
              </span>
              <span className={styles.statLabel}>Total minutes</span>
            </div>
          </div>
        </div>
      )}

      {birthDate && toDate && !result && (
        <div className={styles.error}>
          The birth date must be before the target date.
        </div>
      )}
    </div>
  );
}
