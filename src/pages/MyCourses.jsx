import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Footer from "../components/Footer/Footer";
import SkeletonCard from "../components/CourseCard/SkeletonCard";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import styles from "./Dashboard.module.css";

export default function MyCourses() {
    const { enrolledCourses, progress, removeCourse } = useAppContext();
    const [loading, setLoading] = useState(true);
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    useEffect(() => {
        // Simulate loading from 1-2 seconds as requested
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Attach mock internal progress stats to each explicit enrolled course
    const coursesWithProgress = (enrolledCourses || []).map(course => {
        const p = progress[course.id] || { completedLessons: [] };
        const completedCount = p.completedLessons?.length || 0;
        const total = course.lessons?.length || 1;
        const timeSpent = completedCount * 15;
        return {
            ...course,
            totalLessons: total,
            completedLessons: completedCount,
            timeSpent: timeSpent
        };
    });

    return (
        <div className="my-courses-page-wrapper">
            <main id="main-content" className="page-container" style={{ paddingBottom: 0 }}>
                <div style={{ marginBottom: "var(--space-8)" }} ref={h1Ref} tabIndex={-1}>
                    <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: "600", color: "var(--color-text)", marginBottom: "var(--space-2)" }}>
                        My Enrolled Courses
                    </h2>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                        Track and continue your learning journey
                    </p>
                </div>

                <div className={styles.grid} role="list" aria-label={loading ? "Loading courses" : "Enrolled courses"}>
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <SkeletonCard key={`skeleton-${i}`} />
                        ))
                    ) : (coursesWithProgress?.length || 0) === 0 ? (
                        <div className={styles.empty} role="status">
                            <div className={styles.emptyIcon}>📚</div>
                            <h3 className={styles.emptyTitle}>You haven't enrolled in any courses yet</h3>
                            <Link to="/courses" style={{ 
                                color: "var(--color-primary-light)", 
                                marginTop: "1rem", 
                                display: "inline-block",
                                textDecoration: "underline"
                            }}>
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        (coursesWithProgress || []).map((course) => {
                            const percentage = Math.round((course.completedLessons / course.totalLessons) * 100);

                            return (
                                <article key={course.id} className={styles.card} role="listitem" style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "var(--space-6)", position: "relative" }}>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this course? This action cannot be undone and you will need to enroll again.")) {
                                                removeCourse(course.id);
                                            }
                                        }}
                                        aria-label={`Delete ${course.title} from My Courses`}
                                        style={{
                                            position: "absolute",
                                            top: "var(--space-4)",
                                            right: "var(--space-4)",
                                            background: "transparent",
                                            border: "none",
                                            color: "var(--color-text-dim)",
                                            cursor: "pointer",
                                            padding: "var(--space-2)",
                                            borderRadius: "var(--radius-sm)",
                                            transition: "var(--transition-fast)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.color = "var(--color-danger)"; e.currentTarget.style.background = "rgba(255, 92, 92, 0.1)"; }}
                                        onMouseOut={(e) => { e.currentTarget.style.color = "var(--color-text-dim)"; e.currentTarget.style.background = "transparent"; }}
                                        title="Remove course"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>

                                    <div style={{ marginBottom: "var(--space-4)", paddingRight: "var(--space-8)" }}>
                                        <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-2)", color: "var(--color-text)" }}>{course.title}</h3>
                                        <span style={{ color: "var(--color-primary-light)", fontSize: "var(--text-sm)", fontWeight: "600", padding: "4px 8px", background: "var(--color-primary-dim)", borderRadius: "var(--radius-full)" }}>
                                            {course.category}
                                        </span>
                                    </div>

                                    <ProgressBar percentage={percentage} label="Course Progress" height={8} />

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-6)" }}>
                                        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                                            {course.completedLessons} / {course.totalLessons} Lessons
                                        </span>
                                        <Link
                                            to={`/courses/${course.id}`}
                                            style={{
                                                background: "var(--color-primary)",
                                                color: "#fff",
                                                padding: "var(--space-2) var(--space-4)",
                                                borderRadius: "var(--radius-md)",
                                                fontSize: "var(--text-sm)",
                                                fontWeight: "600",
                                                boxShadow: "var(--shadow-glow)"
                                            }}
                                        >
                                            Continue Learning
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
