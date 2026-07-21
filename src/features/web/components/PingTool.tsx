"use client";

import { useState, useCallback } from "react";
import { Globe, Play, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/shared/ui";
import { useToast } from "@/shared/ui/ToastProvider";
import styles from "./PingTool.module.css";

type PingResult = {
  id: string;
  url: string;
  status: number | null;
  time: number | null;
  error?: string;
  timestamp: Date;
};

export function PingTool() {
  const [url, setUrl] = useState("");
  const [pinging, setPinging] = useState(false);
  const [results, setResults] = useState<PingResult[]>([]);
  const { toast } = useToast();

  const normalizeUrl = useCallback((input: string): string => {
    let normalized = input.trim();
    if (
      !normalized.startsWith("http://") &&
      !normalized.startsWith("https://")
    ) {
      normalized = "https://" + normalized;
    }
    return normalized;
  }, []);

  const handlePing = useCallback(async () => {
    if (!url.trim()) return;
    const target = normalizeUrl(url);

    try {
      new URL(target);
    } catch {
      toast("Please enter a valid URL", "error");
      return;
    }

    setPinging(true);
    const start = performance.now();

    try {
      const response = await fetch(target, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      const time = Math.round(performance.now() - start);

      setResults((prev) =>
        [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            url: target,
            status: response.type === "opaque" ? 0 : response.status,
            time,
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 20),
      );
    } catch (e) {
      const time = Math.round(performance.now() - start);
      setResults((prev) =>
        [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            url: target,
            status: null,
            time,
            error: (e as Error).message || "Request failed",
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 20),
      );
    } finally {
      setPinging(false);
    }
  }, [url, normalizeUrl, toast]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !pinging) {
        handlePing();
      }
    },
    [handlePing, pinging],
  );

  const avgTime =
    results.filter((r) => r.time !== null).length > 0
      ? Math.round(
          results
            .filter((r) => r.time !== null)
            .reduce((sum, r) => sum + r.time!, 0) /
            results.filter((r) => r.time !== null).length,
        )
      : null;

  return (
    <div className={styles.workspace}>
      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <Globe size={16} className={styles.inputIcon} />
          <input
            className={styles.input}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="example.com or https://example.com"
            aria-label="URL to ping"
          />
        </div>
        <Button onClick={handlePing} disabled={pinging || !url.trim()}>
          {pinging ? (
            <Loader2 size={14} className={styles.spin} />
          ) : (
            <Play size={14} />
          )}
          Ping
        </Button>
      </div>

      {avgTime !== null && (
        <div className={styles.summary}>
          <span>
            Average response: <strong>{avgTime}ms</strong>
          </span>
          <span>
            Pings: <strong>{results.length}</strong>
          </span>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((result) => (
            <div
              key={result.id}
              className={`${styles.resultItem} ${result.error ? styles.failed : styles.success}`}
            >
              <div className={styles.resultIcon}>
                {result.error ? (
                  <XCircle size={14} />
                ) : (
                  <CheckCircle2 size={14} />
                )}
              </div>
              <div className={styles.resultInfo}>
                <span className={styles.resultUrl}>{result.url}</span>
                <span className={styles.resultMeta}>
                  {result.error
                    ? result.error
                    : result.status === 0
                      ? "Reachable (opaque response)"
                      : `Status ${result.status}`}
                </span>
              </div>
              <div className={styles.resultTime}>{result.time}ms</div>
            </div>
          ))}
        </div>
      )}

      <p className={styles.note}>
        Uses browser fetch with no-cors mode. Times may differ from server-side
        pings.
      </p>
    </div>
  );
}
