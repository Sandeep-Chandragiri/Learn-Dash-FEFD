import { memo, useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../../context/AppContext";
import styles from "./WeeklyTrendChart.module.css";

/**
 * WeeklyTrendChart — Displays a line chart of simulated weekly learning progress.
 *
 * Requirements:
 * - Uses Recharts ResponsiveContainer
 * - XAxis (Week 1, Week 2...)
 * - YAxis (0-100%)
 * - Tooltip enabled
 * - Smooth monotone line
 * - Clean professional styling
 * - Accessible labels
 *
 * Data is derived dynamically from modules state. We simulate past weeks
 * based on current overall progress to create a trend line that ends at
 * the actual current completion percentage.
 */
const WeeklyTrendChart = memo(function WeeklyTrendChart({ enrolledCourses, progresses }) {
    const { isDark } = useAppContext();

    const strokeColor = isDark ? "#6c63ff" : "#1e40af";
    const tickColor = isDark ? "#555c75" : "#64748b";
    const gridColor = isDark ? "#2e3249" : "#e2e8f0";
    const bgColor = isDark ? "#0f1117" : "#f8fafc";

    const data = useMemo(() => {
        if (!enrolledCourses || !enrolledCourses.length) return [];

        let totalLessons = 0;
        let completedLessons = 0;

        enrolledCourses.forEach(course => {
            const p = progresses[course.id] || { completedLessons: [] };
            totalLessons += course.lessons?.length || 1;
            completedLessons += p.completedLessons?.length || 0;
        });

        const currentPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        const week1 = Math.round(currentPct * 0.2);
        const week2 = Math.round(currentPct * 0.5);
        const week3 = Math.round(currentPct * 0.8);
        const week4 = currentPct;

        return [
            { name: "Week 1", completion: week1 },
            { name: "Week 2", completion: week2 },
            { name: "Week 3", completion: week3 },
            { name: "Week 4", completion: week4 },
        ];
    }, [enrolledCourses, progresses]);

    if (!data.length) return null;

    // Custom Tooltip for accessibility and styling
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip} role="tooltip" aria-live="assertive">
                    <p className={styles.tooltipLabel}>{label}</p>
                    <p className={styles.tooltipValue}>
                        Completion: {payload[0].value}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className={styles.container} aria-label="Weekly Learning Trend Chart">
            <h2 className={styles.sectionTitle}>Weekly Learning Trend</h2>
            <div className={styles.chartWrapper} style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke={tickColor}
                            tick={{ fill: tickColor, fontSize: 12 }}
                            tickMargin={10}
                            axisLine={{ stroke: gridColor }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            stroke={tickColor}
                            tick={{ fill: tickColor, fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="completion"
                            stroke={strokeColor}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: bgColor, stroke: strokeColor }}
                            activeDot={{ r: 6, fill: strokeColor, stroke: bgColor, strokeWidth: 2 }}
                            animationDuration={1000}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
});

export default WeeklyTrendChart;
