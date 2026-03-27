import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard/CourseCard";
import SkeletonCard from "../components/CourseCard/SkeletonCard";
import CourseFilters from "../components/CourseFilters/CourseFilters";
import Footer from "../components/Footer/Footer";
import { courses, PRICE_RANGES } from "../data/courses";
import { useAppContext } from "../context/AppContext";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import styles from "./Courses.module.css";

const DEFAULT_FILTERS = {
    search: "",
    category: "",
    level: "",
    priceIndex: 0,
    minRating: 0,
};

export default function Courses() {
    const { isEnrolled } = useAppContext();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    useEffect(() => {
        // Simulate loading from 1-2 seconds as requested
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleFilterChange = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleReset = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
    }, []);

    const handleCourseClick = useCallback(
        (id) => {
            navigate(`/courses/${id}`);
        },
        [navigate]
    );

    const filteredCourses = useMemo(() => {
        const { search, category, level, priceIndex, minRating } = filters;
        const priceRange = PRICE_RANGES[priceIndex];

        return courses.filter((c) => {
            const matchSearch =
                !search ||
                c.title.toLowerCase().includes(search.toLowerCase()) ||
                c.instructor.toLowerCase().includes(search.toLowerCase()) ||
                c.category.toLowerCase().includes(search.toLowerCase());
            const matchCategory = !category || c.category === category;
            const matchLevel = !level || c.level === level;
            const matchPrice = c.price >= priceRange.min && c.price <= priceRange.max;
            const matchRating = c.rating >= minRating;
            return matchSearch && matchCategory && matchLevel && matchPrice && matchRating;
        });
    }, [filters]);

    return (
        <div className="courses-page-wrapper">
            <main id="main-content" className="page-container" style={{ paddingBottom: 0 }}>
                <div className={styles.header}>
                    <div>
                        <h1 className="page-title" ref={h1Ref} tabIndex={-1}>
                            Course Catalog
                        </h1>
                        <p className={styles.subtitle}>
                            Explore {courses.length} courses across multiple disciplines — filter, search, and jump right in.
                        </p>
                    </div>
                    <div className={styles.statsBadges}>
                        <span className={styles.statBadge}>📚 {courses.length} Courses</span>
                        <span className={styles.statBadge}>🏆 5 Categories</span>
                    </div>
                </div>

                <CourseFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleReset}
                    resultCount={filteredCourses?.length || 0}
                />

                <div className={styles.grid} role="list" aria-label={loading ? "Loading courses" : "Available courses"}>
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={`skeleton-${i}`} role="listitem">
                                <SkeletonCard />
                            </div>
                        ))
                    ) : (filteredCourses?.length || 0) === 0 ? (
                        <div className={styles.empty} role="status">
                            <div className={styles.emptyIcon}>🔍</div>
                            <p className={styles.emptyTitle}>No courses match your filters</p>
                            <p className={styles.emptyText}>Try adjusting or resetting the filters above.</p>
                            <button className={styles.emptyReset} onClick={handleReset}>
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        (filteredCourses || []).map((course) => (
                            <div key={course.id} role="listitem">
                                <CourseCard
                                    course={course}
                                    onEnroll={handleCourseClick}
                                    isEnrolled={isEnrolled(course.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

