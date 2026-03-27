import styles from "./CircularProgress.module.css";

export default function CircularProgress({ 
    percentage = 0, 
    size = 120, 
    strokeWidth = 10, 
    label = "" 
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div 
            className={styles.container} 
            style={{ width: size, height: size }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <svg width={size} height={size} className={styles.svg}>
                <circle
                    className={styles.background}
                    stroke="var(--color-surface-2)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={styles.progress}
                    stroke="var(--color-primary-light)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className={styles.content}>
                <span className={styles.percentage}>{percentage}%</span>
                {label && <span className={styles.label}>{label}</span>}
            </div>
        </div>
    );
}
