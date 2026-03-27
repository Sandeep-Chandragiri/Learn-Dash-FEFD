import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import ThemeToggle from "../common/ThemeToggle";
import styles from "./Navigation.module.css";

/**
 * Navigation — App-wide sticky header.
 *
 * Accessibility:
 *   - Skip-to-content link is the FIRST focusable element in the page,
 *     allowing keyboard users to bypass repetitive navigation (WCAG 2.4.1)
 *   - NavLink applies `active` class for current-page indication
 *   - <nav> landmark role is implicit on the element
 */
export default function Navigation() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {/* Skip link — visually hidden until focused */}
            <a href="#main-content" className="skip-link">
                Skip to content
            </a>

            <nav className={styles.nav} aria-label="Main navigation">
                <div className={styles.inner}>
                    <Link to="/" className={styles.brand} aria-label="Learning Dashboard home">
                        📚 LearnDash
                    </Link>

                    <div className={styles.links}>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.active : ""}`
                            }
                        >
                            Home
                        </NavLink>

                        {user && (
                            <>
                                <NavLink
                                    to="/courses"
                                    className={({ isActive }) =>
                                        `${styles.link} ${isActive ? styles.active : ""}`
                                    }
                                >
                                    🎓 Courses
                                </NavLink>

                                <div className={styles.divider} aria-hidden="true" />

                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `${styles.link} ${isActive ? styles.active : ""}`
                                    }
                                >
                                    Dashboard
                                </NavLink>

                                <div className={styles.divider} aria-hidden="true" />

                                <NavLink
                                    to="/my-courses"
                                    className={({ isActive }) =>
                                        `${styles.link} ${isActive ? styles.active : ""}`
                                    }
                                >
                                    My Courses
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Theme and Auth section */}
                    <div className={styles.authSection}>
                        <ThemeToggle />

                        {user ? (
                            <button 
                                className={styles.userName} 
                                onClick={() => navigate("/profile")}
                                title="View Profile"
                                style={{ 
                                    background: "none", 
                                    border: "none", 
                                    cursor: "pointer", 
                                    padding: "var(--space-1) var(--space-2)", 
                                    borderRadius: "var(--radius-sm)",
                                    transition: "var(--transition-fast)" 
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = "var(--color-surface-2)"}
                                onMouseOut={(e) => e.currentTarget.style.background = "none"}
                            >
                                👤 {user.name}
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `${styles.loginBtn} ${isActive ? styles.loginBtnActive : ""}`
                                }
                            >
                                Sign In
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
