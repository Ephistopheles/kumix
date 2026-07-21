"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/shared/ui";
import styles from "./VatCalculator.module.css";

type Mode = "add" | "remove";

export function VatCalculator() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("21");

  const result = useMemo(() => {
    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(vatRate);
    if (isNaN(amountNum) || isNaN(rateNum) || rateNum < 0) return null;

    if (mode === "add") {
      const vatAmount = amountNum * (rateNum / 100);
      const total = amountNum + vatAmount;
      return {
        net: amountNum,
        vat: vatAmount,
        total,
      };
    }

    const net = amountNum / (1 + rateNum / 100);
    const vatAmount = amountNum - net;
    return {
      net,
      vat: vatAmount,
      total: amountNum,
    };
  }, [amount, vatRate, mode]);

  const formatCurrency = (n: number) => n.toFixed(2);

  return (
    <div className={styles.workspace}>
      <div className={styles.modeSwitch}>
        <button
          className={styles.modeBtn}
          data-active={mode === "add"}
          onClick={() => setMode("add")}
        >
          Add VAT
        </button>
        <button
          className={styles.modeBtn}
          data-active={mode === "remove"}
          onClick={() => setMode("remove")}
        >
          Remove VAT
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="vat-amount">
          {mode === "add" ? "Net amount" : "Gross amount (VAT included)"}
        </label>
        <input
          id="vat-amount"
          className={styles.input}
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <div className={styles.vatRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="vat-rate">
            VAT Rate
          </label>
          <input
            id="vat-rate"
            className={styles.input}
            type="number"
            inputMode="decimal"
            placeholder="21"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <span className={styles.percentSymbol}>%</span>
      </div>

      {result && (
        <div className={styles.resultCard}>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Net amount</span>
            <span className={styles.resultValue}>
              {formatCurrency(result.net)}
            </span>
          </div>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>VAT ({vatRate}%)</span>
            <span className={styles.resultValue}>
              {formatCurrency(result.vat)}
            </span>
          </div>
          <div className={styles.resultDivider} />
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Total</span>
            <span className={`${styles.resultValue} ${styles.resultTotal}`}>
              {formatCurrency(result.total)}
            </span>
          </div>
          <div className={styles.actions}>
            <CopyButton
              text={`Net: ${formatCurrency(result.net)} | VAT: ${formatCurrency(result.vat)} | Total: ${formatCurrency(result.total)}`}
              label="Copy result"
            />
          </div>
        </div>
      )}
    </div>
  );
}
