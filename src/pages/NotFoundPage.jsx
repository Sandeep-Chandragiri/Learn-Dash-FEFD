import { useRef } from "react";
import { Link } from "react-router-dom";
import { useFocusOnMount } from "../hooks/useFocusOnMount";

export default function NotFoundPage() {
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    return (
        <main
            id="main-content"
            className="page-container"
            style={{ textAlign: "center", paddingTop: "5rem" }}
        >
            <h1
                ref={h1Ref}
                tabIndex={-1}
                style={{ fontSize: "6rem", fontWeight: 900, color: "var(--color-primary)", outline: "none" }}
            >
                404
            </h1>
            <p style={{ fontSize: "var(--text-xl)", color: "var(--color-text-muted)", marginBottom: "2rem" }}>
                Page not found
            </p>
            <Link
                to="/"
                style={{
                    display: "inline-block",
                    padding: "0.75rem 2rem",
                    background: "var(--color-primary)",
                    color: "#fff",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 600,
                    textDecoration: "none",
                }}
            >
                ← Go to Dashboard
            </Link>
        </main>
    );
}
