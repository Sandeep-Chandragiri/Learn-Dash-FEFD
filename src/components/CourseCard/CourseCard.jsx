import { formatNumber, formatPrice } from "../../utils/formatUtils";
import styles from "./CourseCard.module.css";

const LEVEL_CLASS = {
    Beginner: styles.levelBeginner,
    Intermediate: styles.levelIntermediate,
    Advanced: styles.levelAdvanced,
};

/**
 * Renders a filled ★ for whole stars and a half ★ for .5+, empty ☆ for the rest.
 */
function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(
                <span key={i} className={styles.starFilled} aria-hidden="true">★</span>
            );
        } else if (rating >= i - 0.5) {
            stars.push(
                <span key={i} className={styles.starHalf} aria-hidden="true">★</span>
            );
        } else {
            stars.push(
                <span key={i} className={styles.starEmpty} aria-hidden="true">☆</span>
            );
        }
    }
    return (
        <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
            {stars}
        </span>
    );
}

export default function CourseCard({ course, onEnroll, isEnrolled }) {
    if (!course) return null;

    const {
        id,
        title = "Untitled Course",
        category = "Uncategorized",
        level = "Beginner",
        duration = "0h",
        rating = 0,
        reviewCount = 0,
        price,
        instructor = "Unknown Instructor",
        enrolled = 0,
        thumbnail = "📚",
    } = course;

    return (
        <article className={styles.card} aria-label={title}>
            {/* Thumbnail */}
            <div className={styles.thumbnail} aria-hidden="true">
                <span className={styles.emoji}>{thumbnail}</span>
                <div className={styles.overlay} />
            </div>

            {/* Badges */}
            <div className={styles.badges}>
                <span className={styles.categoryBadge}>{category}</span>
                <span className={`${styles.levelPill} ${LEVEL_CLASS[level] ?? ""}`}>
                    {level}
                </span>
            </div>

            {/* Body */}
            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.instructor}>by {instructor}</p>

                {/* Stats row */}
                <div className={styles.stats}>
                    <span className={styles.duration} title="Duration">
                        🕒 {duration}
                    </span>
                    <span className={styles.enrolledCount} title="Enrolled students">
                        👩‍🎓 {formatNumber(enrolled, "0")}
                    </span>
                </div>

                {/* Rating */}
                <div className={styles.ratingRow}>
                    <StarRating rating={rating} />
                    <span className={styles.ratingValue}>{(rating || 0).toFixed(1)}</span>
                    <span className={styles.reviewCount}>({formatNumber(reviewCount, "0")})</span>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <span className={styles.price}>{formatPrice(price)}</span>
                <button
                    className={styles.enrollBtn}
                    onClick={() => onEnroll?.(id)}
                    aria-label={`Enroll in ${title}`}
                    disabled={isEnrolled}
                    style={{ opacity: isEnrolled ? 0.6 : 1, cursor: isEnrolled ? "not-allowed" : "pointer" }}
                >
                    {isEnrolled ? "Enrolled" : "Enroll Now"}
                </button>
            </div>
        </article>
    );
}
