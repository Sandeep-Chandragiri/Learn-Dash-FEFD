import { useAppContext } from "../../context/AppContext";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./CourseGrid.module.css";

export default function CourseGrid({ title, subtitle, courses, onEnroll }) {
    const { isEnrolled } = useAppContext();

    if (!courses || courses.length === 0) return null;

    return (
        <section className={styles.section}>
            {(title || subtitle) && (
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            )}

            <div className={styles.grid}>
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onEnroll={onEnroll}
                        isEnrolled={isEnrolled(course.id)}
                    />
                ))}
            </div>
        </section>
    );
}
