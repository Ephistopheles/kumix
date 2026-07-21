"use client";

import styles from "./Toggle.module.css";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  if (label) {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <button
          id={id}
          className={styles.toggle}
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
        >
          <span className={styles.knob} />
        </button>
      </div>
    );
  }

  return (
    <button
      id={id}
      className={styles.toggle}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.knob} />
    </button>
  );
}
