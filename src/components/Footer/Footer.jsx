import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brandSection}>
                    <Link to="/" className={styles.brand}>📚 LearnDash</Link>
                    <p className={styles.description}>
                        Empowering learners worldwide with premium educational content and advanced tracking.
                    </p>
                    <div className={styles.socials}>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Platform</h4>
                        <Link to="/courses" className={styles.link}>Courses</Link>
                        <Link to="/pricing" className={styles.link}>Pricing</Link>
                        <Link to="/about" className={styles.link}>About Us</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Support</h4>
                        <Link to="/faq" className={styles.link}>FAQ</Link>
                        <Link to="/contact" className={styles.link}>Contact</Link>
                        <Link to="/terms" className={styles.link}>Terms of Service</Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} LearnDash. All rights reserved.</p>
            </div>
        </footer>
    );
}
