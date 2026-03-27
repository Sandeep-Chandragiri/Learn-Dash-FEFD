import { memo, useMemo } from "react";
import CircularProgress from "../CircularProgress/CircularProgress";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./SummaryPanel.module.css";

/**
 * SummaryPanel — Displays derived learning statistics.
 *
 * Derived State (all via useMemo — no redundant state):
 *   - overallPct   = Σcompletions / Σtotal * 100
 *   - avgTimeSpent = ΣtimeSpent / n
 *   - completedCount, inProgressCount, notStartedCount
 *
 * Accessibility:
 *   - Stat cards use <dl>/<dt>/<dd> semantics (definition list)
 *   - CircularProgress internally uses role="img" + aria-labelledby
 *
 * Performance: React.memo + internal useMemo
 */
const SummaryPanel = memo(function SummaryPanel({ enrolledCourses, progresses, title = "Learning Overview" }) {
    const stats = useMemo(() => {
        if (!enrolledCourses || !enrolledCourses.length) return null;
        
        let totalLessons = 0;
        let completedLessons = 0;
        let totalTime = 0;
        let completedCount = 0;
        let inProgressCount = 0;
        let notStartedCount = 0;

        enrolledCourses.forEach(course => {
            const p = progresses[course.id] || { completedLessons: [] };
            const courseTotal = course.lessons?.length || 1;
            const courseCompleted = p.completedLessons?.length || 0;
            const timeSpent = courseCompleted * 15;
            
            totalLessons += courseTotal;
            completedLessons += courseCompleted;
            totalTime += timeSpent;

            if (courseCompleted === 0) {
                notStartedCount++;
            } else if (courseCompleted >= courseTotal) {
                completedCount++;
            } else {
                inProgressCount++;
            }
        });

        const overallPct = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        const avgTimeSpent = enrolledCourses.length > 0 ? Math.round(totalTime / enrolledCourses.length) : 0;

        return {
            totalLessons,
            completedLessons,
            overallPct: Math.round(overallPct),
            avgTimeSpent,
            completedCount,
            inProgressCount,
            notStartedCount,
            totalTime,
        };
    }, [enrolledCourses, progresses]);

    if (!stats) return null;

    return (
        <section className={styles.panel} aria-label={title}>
            <div className={styles.circleSection}>
                <CircularProgress
                    percentage={stats.overallPct}
                    size={150}
                    strokeWidth={12}
                    label="Overall Progress"
                />
            </div>

            <div className={styles.statsSection}>
                <div>
                    <h2 className={styles.sectionTitle}>{title}</h2>
                    <p className={styles.subtitle}>
                        {stats.completedLessons} of {stats.totalLessons} lessons completed
                    </p>
                </div>

                <dl className={styles.statCards}>
                    <div className={styles.statCard}>
                        <dd className={styles.value}>{stats.completedCount}</dd>
                        <dt className={styles.label}>Completed</dt>
                    </div>
                    <div className={styles.statCard}>
                        <dd className={styles.value}>{stats.inProgressCount}</dd>
                        <dt className={styles.label}>In Progress</dt>
                    </div>
                    <div className={styles.statCard}>
                        <dd className={styles.value}>{stats.notStartedCount}</dd>
                        <dt className={styles.label}>Not Started</dt>
                    </div>
                    <div className={styles.statCard}>
                        <dd className={styles.value}>{stats.avgTimeSpent}m</dd>
                        <dt className={styles.label}>Avg Time</dt>
                    </div>
                </dl>

                <ProgressBar
                    percentage={stats.overallPct}
                    label="Overall Completion"
                    height={10}
                />
            </div>
        </section>
    );
});

export default SummaryPanel;
