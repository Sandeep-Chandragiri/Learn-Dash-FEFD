import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import CircularProgress from "../components/CircularProgress/CircularProgress";
import Footer from "../components/Footer/Footer";
import { useFocusOnMount } from "../hooks/useFocusOnMount";

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    const { allCourses, isEnrolled, enrollCourse, progress, completeLesson } = useAppContext();
    const course = allCourses.find(c => c.id === parseInt(id));

    useEffect(() => {
        if (!course && id) {
            navigate("/courses", { replace: true });
        }
    }, [course, navigate, id]);

    const [isCompleting, setIsCompleting] = useState(false);

    if (!course) return null;

    const enrolled = isEnrolled(course.id);
    const courseProgress = progress[course.id] || { completedLessons: [] };
    
    const handleEnroll = () => {
        enrollCourse(course.id);
        window.alert("Successfully enrolled in this course!");
    };

    const lessons = course.lessons || [];
    const totalLessons = lessons.length;
    const completedLessonIds = Array.isArray(courseProgress?.completedLessons) ? courseProgress.completedLessons : [];
    const completedCount = completedLessonIds.length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCourseCompleted = completedCount >= totalLessons && totalLessons > 0;
    const timeSpent = completedCount * 15; // mock 15 min per lesson
    const remainingLessons = totalLessons - completedCount;

    // Determine what the "Next Up" lesson is
    const nextLessonIndex = completedCount < totalLessons ? completedCount : -1;
    const nextLesson = nextLessonIndex !== -1 ? lessons[nextLessonIndex] : null;

    const handleCompleteNextLesson = () => {
        if (!nextLesson || isCourseCompleted) return;
        
        setIsCompleting(true);
        // Simulate a tiny async delay for UX
        setTimeout(() => {
            completeLesson(course.id, nextLesson.id);
            setIsCompleting(false);
        }, 500);
    };

    return (
        <div className="course-detail-wrapper">
            <main id="main-content" className="page-container" style={{ paddingBottom: 0 }}>
                {/* Back link */}
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        marginBottom: "var(--space-6)",
                        padding: "var(--space-2) var(--space-3)",
                        borderRadius: "var(--radius-sm)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "color var(--transition-fast), background var(--transition-fast)"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = "var(--color-text)"; e.currentTarget.style.background = "var(--color-surface)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.background = "transparent"; }}
                >
                    ← Back
                </button>

                {/* Course Header info */}
                <div style={{ background: "var(--color-surface)", padding: "var(--space-8)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", marginBottom: "var(--space-8)", display: "flex", gap: "var(--space-8)", flexWrap: "wrap", justifyContent: "space-between" }}>
                    
                    {/* Left Info */}
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-4)", flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ color: "var(--color-primary-light)", fontSize: "var(--text-sm)", fontWeight: "600", padding: "4px 8px", background: "var(--color-primary-dim)", borderRadius: "var(--radius-full)" }}>{course.category}</span>
                            <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", padding: "4px 8px", background: "var(--color-surface-2)", borderRadius: "var(--radius-full)" }}>{course.level}</span>
                            <span style={{ color: "#fbbf24", fontSize: "var(--text-sm)", fontWeight: "600", marginLeft: "auto" }}>⭐ {course.rating?.toFixed(1) || "4.5"}</span>
                        </div>
                        <h1 className="page-title" ref={h1Ref} tabIndex={-1} style={{ marginBottom: "var(--space-4)" }}>
                            {course.title}
                        </h1>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-lg)", lineHeight: "1.6", marginBottom: "var(--space-6)" }}>
                            {course.description}
                        </p>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-8)", marginBottom: "var(--space-6)", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <span style={{ fontSize: "24px", background: "var(--color-surface-2)", padding: "12px", borderRadius: "50%" }}>🧑‍🏫</span>
                                <div>
                                    <h4 style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "var(--color-text)" }}>{course.instructor}</h4>
                                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Course Instructor</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <span style={{ fontSize: "24px", background: "var(--color-surface-2)", padding: "12px", borderRadius: "50%" }}>⏱️</span>
                                <div>
                                    <h4 style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "var(--color-text)" }}>{course.duration}</h4>
                                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Total Duration</span>
                                </div>
                            </div>
                        </div>

                        {!enrolled && (
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
                                <span style={{ fontSize: "var(--text-2xl)", fontWeight: "700", color: "var(--color-text)" }}>₹{course.price}</span>
                                <button
                                    onClick={handleEnroll}
                                    style={{ display: "inline-block", background: "var(--color-primary)", color: "#fff", padding: "var(--space-3) var(--space-8)", borderRadius: "var(--radius-md)", fontWeight: "600", boxShadow: "var(--shadow-glow)", border: "none", cursor: "pointer" }}
                                >
                                    Enroll Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Progress Circle (Only if enrolled) */}
                    {enrolled && (
                        <div style={{ display: "flex", alignItems: "center", padding: "var(--space-6)", minWidth: "200px", justifyContent: "center" }}>
                            <CircularProgress
                                percentage={percentage}
                                size={160}
                                strokeWidth={14}
                                label="Course Completion"
                            />
                        </div>
                    )}
                </div>

                {/* Enrolled View: Detailed Progress & Lessons */}
                {enrolled && (
                    <>
                        {/* 4 Stats Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
                            <div style={{ background: "var(--color-surface)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                                <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--color-text)", marginBottom: "var(--space-2)" }}>
                                    {completedCount}/{totalLessons}
                                </div>
                                <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: "500" }}>Lessons Done</div>
                            </div>
                            <div style={{ background: "var(--color-surface)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                                <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--color-text)", marginBottom: "var(--space-2)" }}>
                                    {percentage}%
                                </div>
                                <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: "500" }}>Completion</div>
                            </div>
                            <div style={{ background: "var(--color-surface)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                                <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--color-text)", marginBottom: "var(--space-2)" }}>
                                    {timeSpent}m
                                </div>
                                <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: "500" }}>Time Spent</div>
                            </div>
                            <div style={{ background: "var(--color-surface)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", textAlign: "center" }}>
                                <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--color-text)", marginBottom: "var(--space-2)" }}>
                                    {remainingLessons}
                                </div>
                                <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: "500" }}>Remaining</div>
                            </div>
                        </div>

                        {/* Progress Bar under stats */}
                        <div style={{ background: "var(--color-surface)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", marginBottom: "var(--space-8)" }}>
                            <ProgressBar percentage={percentage} label="Module Completion" height={10} />
                        </div>

                        {/* Learning Action Area */}
                        <div style={{ background: "var(--color-surface-2)", padding: "var(--space-8)", borderRadius: "var(--radius-xl)", border: "1px dashed var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)", flexWrap: "wrap", gap: "var(--space-6)" }}>
                            <div>
                                <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)", color: "var(--color-text)" }}>
                                    {isCourseCompleted ? "Course Completed 🎉" : "Ready for the next lesson?"}
                                </h3>
                                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                                    {isCourseCompleted ? "You've successfully finished all materials for this course." : `${remainingLessons} lesson${remainingLessons !== 1 ? 's' : ''} remaining to complete the curriculum.`}
                                </p>
                            </div>
                            
                            {!isCourseCompleted && (
                                <button
                                    onClick={handleCompleteNextLesson}
                                    disabled={isCompleting}
                                    style={{
                                        background: "var(--color-primary)",
                                        color: "#fff",
                                        padding: "var(--space-4) var(--space-8)",
                                        borderRadius: "var(--radius-md)",
                                        fontSize: "var(--text-md)",
                                        fontWeight: "600",
                                        boxShadow: "var(--shadow-glow)",
                                        border: "none",
                                        cursor: isCompleting ? "not-allowed" : "pointer",
                                        opacity: isCompleting ? 0.7 : 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--space-2)",
                                        transition: "var(--transition-fast)"
                                    }}
                                >
                                    {isCompleting ? (
                                        <>
                                            <span className="spinner" aria-hidden="true" style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                            Updating...
                                        </>
                                    ) : (
                                        `Complete Lesson ${nextLessonIndex + 1}`
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* Course Curriculum */}
                <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: "700", marginBottom: "var(--space-6)" }}>Course Curriculum</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-12)" }}>
                    {lessons.length === 0 ? (
                        <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>No lessons available for this course yet.</p>
                    ) : (
                        lessons.map((lesson, index) => {
                            const isDone = completedLessonIds.includes(lesson.id);
                            const isNext = index === nextLessonIndex;
                            const isLocked = !isDone && !isNext;

                            // Dynamic styles based on state
                            const bg = isDone ? "var(--color-surface)" : isNext ? "var(--color-surface-hover)" : "var(--color-surface)";
                            const opacity = isLocked ? 0.6 : 1;
                            const borderColor = isNext ? "var(--color-primary-light)" : "var(--color-border)";

                            return (
                                <div key={lesson.id} style={{ 
                                    background: bg, 
                                    padding: "var(--space-4) var(--space-6)", 
                                    borderRadius: "var(--radius-lg)", 
                                    border: `1px solid ${borderColor}`, 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    flexWrap: "wrap", 
                                    gap: "var(--space-4)", 
                                    opacity,
                                    transition: "var(--transition-fast)"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                                        {/* Icon / Index block */}
                                        <div style={{ 
                                            width: "32px", 
                                            height: "32px", 
                                            borderRadius: "50%", 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center", 
                                            fontSize: "var(--text-sm)", 
                                            fontWeight: "700",
                                            background: isDone ? "var(--color-primary-dim)" : "var(--color-surface-2)",
                                            color: isDone ? "var(--color-primary-light)" : "var(--color-text-muted)"
                                        }}>
                                            {isDone ? "✓" : index + 1}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: "var(--text-md)", fontWeight: "600", color: isDone ? "var(--color-text)" : "var(--color-text)" }}>{lesson.title}</h3>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {enrolled ? (
                                            <span style={{ 
                                                padding: "4px 12px", 
                                                borderRadius: "var(--radius-full)", 
                                                fontSize: "var(--text-xs)", 
                                                fontWeight: "600",
                                                background: isDone ? "rgba(16, 185, 129, 0.1)" : isNext ? "var(--color-primary-dim)" : "var(--color-surface-2)",
                                                color: isDone ? "#10b981" : isNext ? "var(--color-primary-light)" : "var(--color-text-muted)",
                                                border: "1px solid transparent"
                                            }}>
                                                {isDone ? "Completed" : isNext ? "Next up" : "Locked"}
                                            </span>
                                        ) : (
                                            <span style={{ 
                                                padding: "4px 12px", 
                                                borderRadius: "var(--radius-full)", 
                                                fontSize: "var(--text-xs)", 
                                                fontWeight: "600",
                                                background: "var(--color-surface-2)",
                                                color: "var(--color-text-muted)"
                                            }}>
                                                Preview
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

