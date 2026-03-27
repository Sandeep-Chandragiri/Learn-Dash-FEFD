import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import Footer from "../components/Footer/Footer";

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const h1Ref = useRef(null);
    useFocusOnMount(h1Ref);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="profile-page-wrapper">
            <main id="main-content" className="page-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <div style={{ 
                    background: "var(--color-surface)", 
                    borderRadius: "var(--radius-lg)", 
                    border: "1px solid var(--color-border)", 
                    padding: "var(--space-10)", 
                    width: "100%", 
                    maxWidth: "500px",
                    textAlign: "center",
                    boxShadow: "var(--shadow-lg)"
                }}>
                    <div style={{ 
                        width: "100px", 
                        height: "100px", 
                        background: "var(--color-primary-dim)", 
                        color: "var(--color-primary-light)", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "3rem", 
                        margin: "0 auto var(--space-6)" 
                    }}>
                        👤
                    </div>
                    
                    <h1 ref={h1Ref} tabIndex={-1} style={{ fontSize: "var(--text-3xl)", fontWeight: "700", marginBottom: "var(--space-2)", color: "var(--color-text)", outline: "none" }}>
                        {user.name}
                    </h1>
                    
                    <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-lg)", marginBottom: "var(--space-8)" }}>
                        {user.email}
                    </p>

                    <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-8)", marginTop: "var(--space-8)" }}>
                        <button 
                            onClick={handleLogout}
                            style={{
                                background: "var(--color-danger)",
                                color: "#fff",
                                border: "none",
                                padding: "var(--space-3) var(--space-8)",
                                borderRadius: "var(--radius-md)",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "var(--transition-base)",
                                width: "100%"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
