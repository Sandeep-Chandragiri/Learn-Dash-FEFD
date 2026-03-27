import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useFocusOnMount } from "../../hooks/useFocusOnMount";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState(location.state?.successMessage || "");
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const passwordValid = form.password.length >= 6;

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
        setSuccessMsg("");
    }

    function handleBlur(e) {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setTouched({ email: true, password: true });
        if (!emailValid || !passwordValid) return;

        setIsLoading(true);
        // Simulate a short async login round-trip
        await new Promise((r) => setTimeout(r, 900));

        const result = login(form.email, form.password);
        setIsLoading(false);

        if (result.ok) {
            navigate("/");
        } else {
            setError(result.error);
            setSuccessMsg("");
        }
    }

    return (
        <main className={styles.page}>
            <div className={styles.card}>
                {/* Logo / brand */}
                <div className={styles.brand}>
                    <span className={styles.brandIcon}>📚</span>
                    <span className={styles.brandName}>LearnDash</span>
                </div>

                <h1 className={styles.title} ref={h1Ref} tabIndex={-1}>
                    Welcome back
                </h1>
                <p className={styles.subtitle}>Sign in to continue learning</p>

                {/* Error banner */}
                {error && (
                    <div className={styles.errorBanner} role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {/* Success banner */}
                {successMsg && (
                    <div className={styles.successBanner} role="status">
                        ✅ {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className={styles.form}>
                    {/* Email */}
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>
                            Email address
                        </label>
                        <div
                            className={`${styles.inputWrapper} ${touched.email && !emailValid ? styles.inputError : ""
                                } ${touched.email && emailValid ? styles.inputValid : ""}`}
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
                                aria-describedby={
                                    touched.email && !emailValid ? "email-error" : undefined
                                }
                                required
                            />
                        </div>
                        {touched.email && !emailValid && (
                            <p id="email-error" className={styles.fieldError}>
                                Enter a valid email address.
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles.field}>
                        <div className={styles.labelRow}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <button
                                type="button"
                                className={styles.forgotLink}
                                onClick={() => { }}
                                tabIndex={0}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div
                            className={`${styles.inputWrapper} ${touched.password && !passwordValid ? styles.inputError : ""
                                } ${touched.password && passwordValid ? styles.inputValid : ""}`}
                        >
                            <span className={styles.inputIcon} aria-hidden="true">🔒</span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                className={styles.input}
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={touched.password && !passwordValid}
                                aria-describedby={
                                    touched.password && !passwordValid
                                        ? "password-error"
                                        : undefined
                                }
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
                            <p id="password-error" className={styles.fieldError}>
                                Password must be at least 6 characters.
                            </p>
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
                                Signing in…
                            </>
                        ) : (
                            "Sign In →"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className={styles.divider} aria-hidden="true">
                    <span>or</span>
                </div>

                {/* Social sign-in buttons (decorative / demo) */}
                <div className={styles.socialRow}>
                    <button className={styles.socialBtn} aria-label="Sign in with Google" type="button">
                        <span>🌐</span> Google
                    </button>
                    <button className={styles.socialBtn} aria-label="Sign in with GitHub" type="button">
                        <span>🐙</span> GitHub
                    </button>
                </div>

                <p className={styles.signupPrompt}>
                    Don't have an account?{" "}
                    <Link to="/signup" className={styles.signupLink}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}
