import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useFocusOnMount } from "../../hooks/useFocusOnMount";
import styles from "./SignupPage.module.css";

export default function SignupPage() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false });

    const nameValid = form.name.trim().length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const passwordValid = form.password.length >= 6;
    const confirmPasswordValid = form.confirmPassword === form.password && form.confirmPassword.length >= 6;

    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty('--x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    function handleBlur(e) {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setTouched({ name: true, email: true, password: true, confirmPassword: true });
        if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) return;

        setIsLoading(true);
        // Simulate a short async round-trip
        await new Promise((r) => setTimeout(r, 900));

        const result = signup(form.name, form.email, form.password);
        setIsLoading(false);

        if (result.ok) {
            navigate("/login", { state: { successMessage: "Account created successfully! Please sign in." } });
        } else {
            setError(result.error);
        }
    }

    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <div className={styles.brand}>
                    <span className={styles.brandIcon}>📚</span>
                    <span className={styles.brandName}>LearnDash</span>
                </div>

                <h1 className={styles.title} ref={h1Ref} tabIndex={-1}>
                    Create an account
                </h1>
                <p className={styles.subtitle}>Start your learning journey today</p>

                {error && (
                    <div className={styles.errorBanner} role="alert">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className={styles.form}>
                    {/* Name */}
                    <div className={styles.field}>
                        <label htmlFor="name" className={styles.label}>Full Name</label>
                        <div
                            className={`${styles.inputWrapper} ${touched.name && !nameValid ? styles.inputError : ""} ${touched.name && nameValid ? styles.inputValid : ""}`}
                        >
                            <span className={styles.inputIcon} aria-hidden="true">👤</span>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className={styles.input}
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={touched.name && !nameValid}
                                required
                            />
                        </div>
                        {touched.name && !nameValid && (
                            <p className={styles.fieldError}>Name is required.</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email address</label>
                        <div
                            className={`${styles.inputWrapper} ${touched.email && !emailValid ? styles.inputError : ""} ${touched.email && emailValid ? styles.inputValid : ""}`}
                        >
                            <span className={styles.inputIcon} aria-hidden="true">✉️</span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={styles.input}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={touched.email && !emailValid}
                                required
                            />
                        </div>
                        {touched.email && !emailValid && (
                            <p className={styles.fieldError}>Enter a valid email address.</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div
                            className={`${styles.inputWrapper} ${touched.password && !passwordValid ? styles.inputError : ""} ${touched.password && passwordValid ? styles.inputValid : ""}`}
                        >
                            <span className={styles.inputIcon} aria-hidden="true">🔒</span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                className={styles.input}
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={touched.password && !passwordValid}
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {touched.password && !passwordValid && (
                            <p className={styles.fieldError}>Password must be at least 6 characters.</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.field}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        <div
                            className={`${styles.inputWrapper} ${touched.confirmPassword && !confirmPasswordValid ? styles.inputError : ""} ${touched.confirmPassword && confirmPasswordValid ? styles.inputValid : ""}`}
                        >
                            <span className={styles.inputIcon} aria-hidden="true">🔒</span>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                className={styles.input}
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={touched.confirmPassword && !confirmPasswordValid}
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {touched.confirmPassword && form.confirmPassword.length > 0 && form.confirmPassword !== form.password && (
                            <p className={styles.fieldError}>Passwords do not match.</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner" aria-hidden="true" />
                                Creating account…
                            </>
                        ) : (
                            "Sign Up →"
                        )}
                    </button>
                </form>

                <p className={styles.loginPrompt}>
                    Already have an account?{" "}
                    <Link to="/login" className={styles.loginLink}>
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
