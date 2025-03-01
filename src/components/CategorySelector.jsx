import { useApp } from "../context/AppContext";
import {
  CATEGORIES,
  CATEGORY_NAMES,
  getCategoryStats,
} from "../data/questions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "../firebase/config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const CategorySelector = () => {
  const { currentCategory, setCurrentCategory, user } = useApp();
  const categoryStats = getCategoryStats();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const categoryProgress = {};

          Object.entries(userData.progress || {}).forEach(
            ([category, data]) => {
              if (data.results && data.results.length > 0) {
                const testResults = data.results.slice(-4); // Son 4 testi al
                const scores = testResults.map(
                  (result) => (result.score / result.totalQuestions) * 100
                );

                // Her testin başarı yüzdesini hesapla ve toplamı 4'e böl
                const completionPercentage = Math.min(
                  testResults.reduce(
                    (sum, result) =>
                      sum + (result.score / result.totalQuestions) * 25, // Her test maksimum %25 katkı sağlar
                    0
                  ),
                  100
                );

                // Son 4 testin ortalamasını al
                const averageScore =
                  scores.reduce((sum, score) => sum + score, 0) / scores.length;

                categoryProgress[category] = {
                  score: averageScore,
                  testCount: data.results.length,
                  completion: completionPercentage,
                  lastScore: scores[scores.length - 1], // Son test skoru
                  individualScores: testResults.map(
                    (result) => (result.score / result.totalQuestions) * 100
                  ), // Son 4 testin bireysel skorları
                };
              } else {
                categoryProgress[category] = {
                  score: 0,
                  testCount: 0,
                  completion: 0,
                  lastScore: 0,
                  individualScores: [],
                };
              }
            }
          );

          setProgress(categoryProgress);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [user]);

  const getProgressStatus = (progress) => {
    if (!progress) return null;

    const { score, testCount, completion, lastScore, individualScores } =
      progress;

    if (testCount === 0) return "Henüz test yapılmadı";

    if (testCount < 4) {
      // 4'ten az test varsa, mevcut testlerin ortalamasını ve kalan test sayısını göster
      const currentAverage =
        individualScores.reduce((sum, score) => sum + score, 0) /
        individualScores.length;
      return `${completion.toFixed(
        0
      )}% (${testCount}/4) - Ort: %${currentAverage.toFixed(0)}`;
    }

    // 4 veya daha fazla test varsa son 4 testin ortalamasını göster
    return `Başarı: %${score.toFixed(0)} (${testCount} Test)`;
  };

  const getProgressColor = (progress) => {
    if (!progress) return "bg-gray-400/60";
    if (progress.testCount === 0) return "bg-gray-400/60";

    const { completion, score, individualScores } = progress;

    // Eğer 4'ten az test yapıldıysa, mevcut testlerin ortalamasına göre renk ver
    if (progress.testCount < 4) {
      const currentAverage =
        individualScores.reduce((sum, score) => sum + score, 0) /
        individualScores.length;

      if (currentAverage >= 90) return "bg-green-500/60";
      if (currentAverage >= 70) return "bg-green-400/60";
      if (currentAverage >= 50) return "bg-yellow-400/60";
      if (currentAverage >= 30) return "bg-orange-400/60";
      return "bg-red-400/60";
    }

    // 4 test tamamlandıysa
    if (score >= 90) return "bg-green-500/60";
    if (score >= 70) return "bg-green-400/60";
    if (score >= 50) return "bg-yellow-400/60";
    if (score >= 30) return "bg-orange-400/60";
    return "bg-red-400/60";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-8"
    >
      {Object.entries(CATEGORY_NAMES).map(([id, name]) => (
        <motion.button
          key={id}
          variants={itemVariants}
          whileHover={{
            scale: 1.03,
            y: -3,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCurrentCategory(id)}
          className={`relative w-full sm:w-auto px-4 py-3 rounded-xl transition-all transform overflow-hidden ${
            currentCategory === id
              ? "bg-slate-800 text-white shadow-lg shadow-primary-500/30"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <div className="relative z-10">
            <span className="font-medium">{name}</span>
            {id !== CATEGORIES.ALL && (
              <span
                className={`ml-2 text-sm ${
                  currentCategory === id
                    ? "text-primary-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                ({categoryStats[id]})
              </span>
            )}
            {id !== CATEGORIES.ALL && progress[id] !== undefined && (
              <div className="mt-2 text-xs text-right">
                <span
                  className={
                    currentCategory === id
                      ? "text-primary-100"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  {getProgressStatus(progress[id])}
                </span>
              </div>
            )}
          </div>

          {/* İlerleme çubuğu */}
          {id !== CATEGORIES.ALL && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200/50 dark:bg-gray-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress[id]?.completion || 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${
                  currentCategory === id
                    ? "bg-white/30"
                    : getProgressColor(progress[id])
                }`}
              />
            </div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};
