import { memo, useMemo } from "react";
import { aggregateOverallAnalytics } from "../../utils/progressUtils";
import styles from "./AnalyticsSummary.module.css";

/**
 * AnalyticsSummary — Displays advanced derived learning statistics.
 */
const AnalyticsSummary = memo(function AnalyticsSummary({ enrolledCourses, progresses }) {
    const stats = useMemo(() => {
        if (!enrolledCourses || !enrolledCourses.length) return null;
        return aggregateOverallAnalytics(enrolledCourses, progresses);
    }, [enrolledCourses, progresses]);

    if (!stats) return null;

    return (
        <section className={styles.container} aria-label="Advanced Analytics Summary">
            <h2 className={styles.sectionTitle}>Analytics Overview</h2>
            <dl className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <dt className={styles.label}>Overall Completion</dt>
                    <dd className={styles.value}>{stats.overallPct}%</dd>
                </div>
                <div className={styles.metricCard}>
                    <dt className={styles.label}>Avg Time / Lesson</dt>
                    <dd className={styles.value}>{stats.avgTimePerLesson} min</dd>
                </div>
                <div className={styles.metricCard}>
                    <dt className={styles.label}>Total Lessons Completed</dt>
                    <dd className={styles.value}>{stats.totalCompletedAcrossCourses}</dd>
                </div>
                <div className={styles.metricCard}>
                    <dt className={styles.label}>Total Learning Time</dt>
                    <dd className={styles.value}>{stats.totalTimeSpent} min</dd>
                </div>
                <div className={styles.metricCard}>
                    <dt className={styles.label}>Fastest Module</dt>
                    <dd className={`${styles.value} ${styles.truncate}`} title={stats.fastestModule}>
                        {stats.fastestModule}
                    </dd>
                </div>
            </dl>
        </section>
    );
});

export default AnalyticsSummary;
