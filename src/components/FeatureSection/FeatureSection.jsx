import styles from "./FeatureSection.module.css";

const features = [
    {
        id: 1,
        icon: "📈",
        title: "Progress Tracking",
        description: "Visualize your learning journey with detailed progress bars and completion metrics."
    },
    {
        id: 2,
        icon: "📊",
        title: "Course Analytics",
        description: "Gain insights into your study habits with weekly trend charts and time-spent analytics."
    },
    {
        id: 3,
        icon: "🧩",
        title: "Interactive Modules",
        description: "Engage with bite-sized lessons that make complex topics easy to digest and remember."
    }
];

export default function FeatureSection() {
    return (
        <section className={styles.features}>
            <div className={styles.header}>
                <h2 className={styles.title}>Why Choose <span className={styles.highlight}>LearnDash</span>?</h2>
                <p className={styles.subtitle}>Everything you need to master new skills effectively.</p>
            </div>

            <div className={styles.grid}>
                {features.map(feature => (
                    <div key={feature.id} className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <span className={styles.icon}>{feature.icon}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.cardDesc}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
