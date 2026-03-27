import { useRef } from "react";
import SummaryPanel from "../components/SummaryPanel/SummaryPanel";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import WeeklyTrendChart from "../components/analytics/WeeklyTrendChart";
import { useAppContext } from "../context/AppContext";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import Footer from "../components/Footer/Footer";

/**
 * Dashboard — Root route "/dashboard"
 *
 * Fully Analytics-Only according to requirements.
 * No learning interactions, just progress dashboards.
 */
export default function Dashboard() {
    const { enrolledCourses, progress } = useAppContext();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    // Active courses are simply enrolled courses that have progress
    const activeCourses = (enrolledCourses || []).filter(c => (progress[c.id]?.completedLessons?.length || 0) > 0);

    return (
        <div className="dashboard-page-wrapper">
            <main id="main-content" className="page-container" style={{ paddingBottom: 0 }}>
                <h1 className="page-title" ref={h1Ref} tabIndex={-1}>
                    Performance Analytics
                </h1>

                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-lg)", marginBottom: "var(--space-8)" }}>
                    {(enrolledCourses?.length || 0) === 0 
                        ? "You are not enrolled in any courses. Enroll in a course to see your analytics here." 
                        : "Track your learning velocity, review your overall progress, and visualize your weekly engagement trends."}
                </p>

                {(enrolledCourses?.length || 0) > 0 ? (
                    <>
                        <SummaryPanel enrolledCourses={enrolledCourses} progresses={progress} title="Your Overall Progress" />

                        <AnalyticsSummary enrolledCourses={enrolledCourses} progresses={progress} />

                        <div style={{ marginBottom: "var(--space-12)" }}>
                            <WeeklyTrendChart enrolledCourses={enrolledCourses} progresses={progress} />
                        </div>
                    </>
                ) : (
                    <div style={{ 
                        padding: "var(--space-12)", 
                        textAlign: "center", 
                        background: "var(--color-surface)", 
                        borderRadius: "var(--radius-lg)", 
                        border: "1px solid var(--color-border)",
                        marginBottom: "var(--space-12)"
                    }}>
                        <h2 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-4)" }}>No Analytics Available Yet</h2>
                        <p style={{ color: "var(--color-text-muted)" }}>Go to the Courses page to discover and enroll in new learning material!</p>
                    </div>
                )}

                {/* Inspiration for Learning Section */}
                <section aria-labelledby="inspiration-title" style={{ marginTop: "var(--space-12)" }}>
                    <h2 id="inspiration-title" style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)", color: "var(--color-text)" }}>
                        Inspiration for Learning
                    </h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "var(--space-6)"
                    }}>
                        {/* Quote Card 1 */}
                        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "var(--space-6)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <p style={{ fontStyle: "italic", fontSize: "var(--text-lg)", color: "var(--color-text)", marginBottom: "var(--space-4)", lineHeight: "1.6", textAlign: "center" }}>
                                "Live as if you were to die tomorrow. Learn as if you were to live forever."
                            </p>
                            <span style={{ display: "block", textAlign: "center", color: "var(--color-primary-light)", fontWeight: "600", fontSize: "var(--text-sm)" }}>
                                — Mahatma Gandhi
                            </span>
                        </div>

                        {/* Quote Card 2 */}
                        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "var(--space-6)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <p style={{ fontStyle: "italic", fontSize: "var(--text-lg)", color: "var(--color-text)", marginBottom: "var(--space-4)", lineHeight: "1.6", textAlign: "center" }}>
                                "The beautiful thing about learning is that no one can take it away from you."
                            </p>
                            <span style={{ display: "block", textAlign: "center", color: "var(--color-primary-light)", fontWeight: "600", fontSize: "var(--text-sm)" }}>
                                — B.B. King
                            </span>
                        </div>

                        {/* Quote Card 3 */}
                        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "var(--space-6)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <p style={{ fontStyle: "italic", fontSize: "var(--text-lg)", color: "var(--color-text)", marginBottom: "var(--space-4)", lineHeight: "1.6", textAlign: "center" }}>
                                "Success is the sum of small efforts repeated day in and day out."
                            </p>
                            <span style={{ display: "block", textAlign: "center", color: "var(--color-primary-light)", fontWeight: "600", fontSize: "var(--text-sm)" }}>
                                — Robert Collier
                            </span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
