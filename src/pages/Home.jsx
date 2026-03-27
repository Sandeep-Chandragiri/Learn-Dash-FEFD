import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection/HeroSection";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import CourseGrid from "../components/CourseGrid/CourseGrid";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";
import { courses } from "../data/courses";

export default function Home() {
    const navigate = useNavigate();
    // Get top 4 highest rated courses for the preview section
    const popularCourses = [...courses]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    const handleCourseClick = (id) => {
        navigate(`/courses/${id}`);
    };

    return (
        <div className="home-page">
            <main id="main-content" className="page-container" style={{ paddingBottom: 0 }}>
                <HeroSection />
                <FeatureSection />
                <CourseGrid
                    title="Popular Courses"
                    subtitle="Start your journey with our top-rated content."
                    courses={popularCourses}
                    onEnroll={handleCourseClick}
                />
                <Testimonials />
            </main>
            <Footer />
        </div>
    );
}

