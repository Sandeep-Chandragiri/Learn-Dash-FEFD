/**
 * Utility functions for calculating course and lesson progress
 */

export function calculateProgress(completedLessons, totalLessons) {
    if (!totalLessons || totalLessons === 0) return 0;
    const progress = (completedLessons / totalLessons) * 100;
    return Math.min(100, Math.max(0, Math.round(progress)));
}

export function aggregateOverallAnalytics(enrolledCourses, progresses, allCourses) {
    let totalLessonsAcrossCourses = 0;
    let totalCompletedAcrossCourses = 0;
    let totalTimeSpent = 0;
    let fastestModule = null;

    (enrolledCourses || []).forEach((course) => {
        const p = progresses[course.id];
        if (!p) return;

        const totalLessons = course.lessons?.length || 0;
        const completedCount = p.completedLessons?.length || 0;
        const timeSpent = completedCount * 15; // mock 15 mins per lesson

        totalLessonsAcrossCourses += totalLessons;
        totalCompletedAcrossCourses += completedCount;
        totalTimeSpent += timeSpent;

        if (completedCount === totalLessons && totalLessons > 0) {
            if (!fastestModule || timeSpent < fastestModule.timeSpent) {
                fastestModule = { title: course.title, timeSpent: timeSpent };
            }
        }
    });

    const overallPct = calculateProgress(totalCompletedAcrossCourses, totalLessonsAcrossCourses);
    const avgTimePerLesson = totalCompletedAcrossCourses > 0 
        ? Math.round(totalTimeSpent / totalCompletedAcrossCourses) 
        : 0;

    return {
        overallPct,
        totalCompletedAcrossCourses,
        totalTimeSpent,
        avgTimePerLesson,
        fastestModule: fastestModule ? fastestModule.title : "N/A"
    };
}
