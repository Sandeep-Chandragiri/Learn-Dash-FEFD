import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (user) {
            navigate("/courses");
        } else {
            navigate("/login");
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Learn Smarter with <span className={styles.highlight}>LearnDash</span>
                </h1>
                <p className={styles.description}>
                    Elevate your skills with our curated courses, track your progress with advanced analytics,
                    and achieve your learning goals faster in a distraction-free environment.
                </p>
                <div className={styles.ctaGroup}>
                    <button onClick={handleGetStarted} className={styles.primaryBtn}>
                        {user ? "Go to Courses" : "Get Started"}
                    </button>
                    <button onClick={() => navigate("/courses")} className={styles.secondaryBtn}>
                        Explore Courses
                    </button>
                </div>
            </div>
            <div className={styles.visual}>
                <div className={styles.glow} />
                <div className={styles.glassCard}>
                    <div className={styles.mockupHeader}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                    </div>
                    <div className={styles.mockupBody}>
                        <div className={styles.mockupLine} style={{ width: "80%" }} />
                        <div className={styles.mockupLine} style={{ width: "60%" }} />
                        <div className={styles.mockupLine} style={{ width: "70%" }} />
                        <div className={styles.mockupChart}>
                            <div className={styles.bar} style={{ height: "40%" }} />
                            <div className={styles.bar} style={{ height: "70%" }} />
                            <div className={styles.bar} style={{ height: "50%" }} />
                            <div className={styles.bar} style={{ height: "90%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
