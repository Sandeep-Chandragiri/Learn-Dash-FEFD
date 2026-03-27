import styles from "./CourseFilters.module.css";
import { COURSE_CATEGORIES, COURSE_LEVELS, PRICE_RANGES } from "../../data/courses";

const RATING_OPTIONS = [
    { label: "Any Rating", value: 0 },
    { label: "4.5 & up", value: 4.5 },
    { label: "4.0 & up", value: 4.0 },
    { label: "3.5 & up", value: 3.5 },
];

/**
 * CourseFilters — Search bar + filter selects + result count + reset
 *
 * Props:
 *   filters       { search, category, level, priceIndex, minRating }
 *   onChange(key, value)
 *   onReset()
 *   resultCount   number
 */
export default function CourseFilters({ filters, onChange, onReset, resultCount }) {
    const hasActiveFilters =
        filters.search ||
        filters.category ||
        filters.level ||
        filters.priceIndex !== 0 ||
        filters.minRating !== 0;

    return (
        <section className={styles.wrapper} aria-label="Course filters">
            {/* Search */}
            <div className={styles.searchRow}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon} aria-hidden="true">🔍</span>
                    <input
                        id="course-search"
                        type="search"
                        className={styles.searchInput}
                        placeholder="Search courses…"
                        value={filters.search}
                        onChange={(e) => onChange("search", e.target.value)}
                        aria-label="Search courses"
                    />
                </div>

                {/* Result count */}
                <p className={styles.resultCount} aria-live="polite" aria-atomic="true">
                    {resultCount} course{resultCount !== 1 ? "s" : ""} found
                </p>
            </div>

            {/* Filter row */}
            <div className={styles.filterRow}>
                {/* Category */}
                <div className={styles.selectGroup}>
                    <label htmlFor="filter-category" className={styles.label}>Category</label>
                    <select
                        id="filter-category"
                        className={styles.select}
                        value={filters.category}
                        onChange={(e) => onChange("category", e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {COURSE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Level */}
                <div className={styles.selectGroup}>
                    <label htmlFor="filter-level" className={styles.label}>Level</label>
                    <select
                        id="filter-level"
                        className={styles.select}
                        value={filters.level}
                        onChange={(e) => onChange("level", e.target.value)}
                    >
                        <option value="">All Levels</option>
                        {COURSE_LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className={styles.selectGroup}>
                    <label htmlFor="filter-price" className={styles.label}>Price</label>
                    <select
                        id="filter-price"
                        className={styles.select}
                        value={filters.priceIndex}
                        onChange={(e) => onChange("priceIndex", Number(e.target.value))}
                    >
                        {PRICE_RANGES.map((p, i) => (
                            <option key={p.label} value={i}>{p.label}</option>
                        ))}
                    </select>
                </div>

                {/* Rating */}
                <div className={styles.selectGroup}>
                    <label htmlFor="filter-rating" className={styles.label}>Min Rating</label>
                    <select
                        id="filter-rating"
                        className={styles.select}
                        value={filters.minRating}
                        onChange={(e) => onChange("minRating", Number(e.target.value))}
                    >
                        {RATING_OPTIONS.map((r) => (
                            <option key={r.label} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                </div>

                {/* Reset */}
                {hasActiveFilters && (
                    <button className={styles.resetBtn} onClick={onReset} aria-label="Reset all filters">
                        ✕ Reset
                    </button>
                )}
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
                <div className={styles.chips} aria-label="Active filters">
                    {filters.search && (
                        <span className={styles.chip}>
                            Search: "{filters.search}"
                            <button onClick={() => onChange("search", "")} aria-label="Remove search filter">×</button>
                        </span>
                    )}
                    {filters.category && (
                        <span className={styles.chip}>
                            {filters.category}
                            <button onClick={() => onChange("category", "")} aria-label={`Remove ${filters.category} filter`}>×</button>
                        </span>
                    )}
                    {filters.level && (
                        <span className={styles.chip}>
                            {filters.level}
                            <button onClick={() => onChange("level", "")} aria-label={`Remove ${filters.level} filter`}>×</button>
                        </span>
                    )}
                    {filters.priceIndex !== 0 && (
                        <span className={styles.chip}>
                            {PRICE_RANGES[filters.priceIndex].label}
                            <button onClick={() => onChange("priceIndex", 0)} aria-label="Remove price filter">×</button>
                        </span>
                    )}
                    {filters.minRating !== 0 && (
                        <span className={styles.chip}>
                            ★ {filters.minRating}+
                            <button onClick={() => onChange("minRating", 0)} aria-label="Remove rating filter">×</button>
                        </span>
                    )}
                </div>
            )}
        </section>
    );
}
