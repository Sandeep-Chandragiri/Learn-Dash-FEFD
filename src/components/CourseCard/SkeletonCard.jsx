import styles from "./SkeletonCard.module.css";

/**
 * SkeletonCard Component
 * Displays a placeholder card with a shimmer effect to represent a loading CourseCard.
 */
export default function SkeletonCard() {
    return (
        <article className={styles.skeleton} aria-hidden="true">
            <div className={styles.shimmerOverlay} />
            
            {/* Thumbnail Placeholder */}
            <div className={`${styles.placeholder} ${styles.imagePlaceholder}`}>
                📚
            </div>

            {/* Badges Placeholder */}
            <div className={styles.badgesRow}>
                <div className={`${styles.placeholder} ${styles.badgePlaceholder}`} />
                <div className={`${styles.placeholder} ${styles.badgePlaceholder}`} />
            </div>

            {/* Title Placeholder */}
            <div className={`${styles.placeholder} ${styles.titlePlaceholder}`} />
            
            {/* Instructor Placeholder */}
            <div className={`${styles.placeholder} ${styles.textPlaceholder}`} />

            {/* Stats Placeholders */}
            <div className={styles.statsRow}>
                <div className={`${styles.placeholder} ${styles.statItem}`} />
                <div className={`${styles.placeholder} ${styles.statItem}`} />
            </div>

            {/* Rating Placeholder */}
            <div className={styles.ratingRow}>
                <div className={`${styles.placeholder} ${styles.stars}`} />
                <div className={`${styles.placeholder} ${styles.ratingValue}`} />
            </div>

            {/* Footer Placeholder */}
            <div className={styles.footer}>
                <div className={`${styles.placeholder} ${styles.pricePlaceholder}`} />
                <div className={`${styles.placeholder} ${styles.buttonPlaceholder}`} />
            </div>
        </article>
    );
}
