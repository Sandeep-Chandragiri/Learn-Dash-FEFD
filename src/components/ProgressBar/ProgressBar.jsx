import { memo } from "react";
import styles from "./ProgressBar.module.css";

/**
 * ProgressBar — Accessible, percentage-based progress indicator.
 *
 * Accessibility:
 *   - role="progressbar" with aria-valuenow/min/max per ARIA spec
 *   - aria-label provides a human-readable description
 *   - Visible label + percentage value for sighted users
 *
 * Performance: wrapped in React.memo — only re-renders when percentage changes
 */
const ProgressBar = memo(function ProgressBar({
    percentage = 0,
    label = "Progress",
    height = 8,
    color = "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
    showLabel = true,
}) {
    const clamped = Math.min(100, Math.max(0, Math.round(percentage)));

    return (
        <div className={styles.wrapper}>
            {showLabel && (
                <div className={styles.labelRow}>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.value}>{clamped}%</span>
                </div>
            )}
            <div
                className={styles.track}
                style={{ height }}
                role="progressbar"
                aria-valuenow={clamped}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${label}: ${clamped}% complete`}
            >
                <div
                    className={styles.fill}
                    style={{ width: `${clamped}%`, background: color }}
                />
            </div>
        </div>
    );
});

export default ProgressBar;
