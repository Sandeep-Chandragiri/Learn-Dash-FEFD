import styles from "./Testimonials.module.css";

const testimonials = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Frontend Developer",
        content: "LearnDash completely transformed the way I learn. The progress tracking keeps me motivated, and the courses are top-notch.",
        avatar: "🧑‍💻"
    },
    {
        id: 2,
        name: "Sarah Lee",
        role: "UX Designer",
        content: "The interface is gorgeous! Studying here doesn't feel like a chore. The interactive modules are perfectly paced.",
        avatar: "👩‍🎨"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Software Engineer",
        content: "I've tried many platforms, but the dark mode aesthetics and detailed analytics here are unmatched. Highly recommended.",
        avatar: "👨‍💻"
    }
];

export default function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <div className={styles.header}>
                <h2 className={styles.title}>What Our <span className={styles.highlight}>Learners</span> Say</h2>
                <p className={styles.subtitle}>Join thousands of students achieving their goals.</p>
            </div>

            <div className={styles.grid}>
                {testimonials.map(t => (
                    <div key={t.id} className={styles.card}>
                        <p className={styles.content}>"{t.content}"</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}>{t.avatar}</div>
                            <div>
                                <h4 className={styles.name}>{t.name}</h4>
                                <span className={styles.role}>{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
