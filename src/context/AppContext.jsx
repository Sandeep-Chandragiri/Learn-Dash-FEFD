import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { courses } from "../data/courses";

const AppContext = createContext(null);

const STORAGE_KEY = "learndash_app_data";
const THEME_KEY = "learndash_theme";
const AUTH_KEY = "currentUser";
const USERS_KEY = "users";

export function AppProvider({ children }) {
    // --- AUTH STATE ---
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem(AUTH_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            return null;
        }
    });

    const login = useCallback((email, password) => {
        if (!email || !password) return { ok: false, error: "Please fill in both fields." };
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        const encodedPassword = btoa(password);
        const existingUser = users.find(u => u.email === email && u.password === encodedPassword);
        if (existingUser) {
            const loggedInUser = { name: existingUser.name, email: existingUser.email };
            setUser(loggedInUser);
            localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));
            return { ok: true };
        }
        return { ok: false, error: "Invalid email or password." };
    }, []);

    const signup = useCallback((name, email, password) => {
        if (!name || !email || !password) return { ok: false, error: "Please fill in all fields." };
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        if (users.find(u => u.email === email)) return { ok: false, error: "Email already exists." };
        const newUser = { name, email, password: btoa(password) };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return { ok: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    }, []);

    // --- THEME STATE ---
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(THEME_KEY) || "light";
        } catch (e) {
            return "light";
        }
    });

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }, []);

    // --- APP DATA STATE ---
    const loadInitialAppState = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.progress) {
                    for (const id in parsed.progress) {
                        if (!Array.isArray(parsed.progress[id].completedLessons)) {
                            localStorage.removeItem(STORAGE_KEY);
                            return { enrolledCourseIds: [], progress: {} };
                        }
                    }
                }
                return parsed;
            }
        } catch (e) {}
        return { enrolledCourseIds: [], progress: {} };
    };

    const [appState, setAppState] = useState(loadInitialAppState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    }, [appState]);

    const enrolledCourses = useMemo(() => 
        appState.enrolledCourseIds
            .map(id => courses.find(c => c.id === id))
            .filter(Boolean),
    [appState.enrolledCourseIds]);

    const isEnrolled = useCallback((courseId) => appState.enrolledCourseIds.includes(courseId), [appState.enrolledCourseIds]);

    const enrollCourse = useCallback((courseId) => {
        setAppState(prev => {
            if (prev.enrolledCourseIds.includes(courseId)) return prev;
            return {
                ...prev,
                enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
                progress: { ...prev.progress, [courseId]: { completedLessons: [] } }
            };
        });
    }, []);

    const removeCourse = useCallback((courseId) => {
        setAppState(prev => {
            const nextProgress = { ...prev.progress };
            delete nextProgress[courseId];
            return {
                ...prev,
                enrolledCourseIds: prev.enrolledCourseIds.filter(id => id !== courseId),
                progress: nextProgress
            };
        });
    }, []);

    const completeLesson = useCallback((courseId, lessonId) => {
        setAppState(prev => {
            if (!prev.enrolledCourseIds.includes(courseId)) return prev;
            const current = prev.progress[courseId] || { completedLessons: [] };
            if (current.completedLessons.includes(lessonId)) return prev;
            return {
                ...prev,
                progress: {
                    ...prev.progress,
                    [courseId]: { completedLessons: [...current.completedLessons, lessonId] }
                }
            };
        });
    }, []);

    const value = {
        // Auth
        user, login, signup, logout,
        // Theme
        theme, toggleTheme, isDark: theme === "dark",
        // App
        enrolledCourses, progress: appState.progress, isEnrolled, enrollCourse, removeCourse, completeLesson,
        allCourses: courses
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within an AppProvider");
    return context;
}

// Exporting aliases for backward compatibility and clean code
export const useAuth = useAppContext;
export const useTheme = useAppContext;
