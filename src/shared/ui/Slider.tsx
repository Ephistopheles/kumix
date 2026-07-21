"use client";

import styles from "./Slider.module.css";

type SliderProps = {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.row}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>
            {formatValue ? formatValue(value) : value}
          </span>
        </div>
      )}
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
        <input
          className={styles.input}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
