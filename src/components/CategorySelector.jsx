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
                const scores = data.results.map(
                  (result) => (result.score / result.totalQuestions) * 100
                );

                // Her test %25 değerinde, 4 test = %100
                const completionPercentage = Math.min(
                  data.results.length * 25,
                  100
                );

                // Son 4 testin ortalamasını al
                const lastFourScores = scores.slice(-4);
                const averageScore =
                  lastFourScores.reduce((sum, score) => sum + score, 0) /
                  lastFourScores.length;

                categoryProgress[category] = {
                  score: averageScore,
                  testCount: data.results.length,
                  completion: completionPercentage,
                  lastScore: scores[scores.length - 1], // Son test skoru
                };
              } else {
                categoryProgress[category] = {
                  score: 0,
                  testCount: 0,
                  completion: 0,
                  lastScore: 0,
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

  const getProgressColor = (progress) => {
    if (!progress) return "bg-gray-400/60";

    const { score, completion } = progress;
    if (completion < 100) {
      // 4 test tamamlanmadıysa mavi tonlarında göster
      return "bg-blue-400/60";
    }

    // 4 test tamamlandıysa başarı durumuna göre renk ver
    if (score >= 90) return "bg-green-500/60";
    if (score >= 70) return "bg-green-400/60";
    if (score >= 50) return "bg-yellow-400/60";
    if (score >= 30) return "bg-orange-400/60";
    return "bg-red-400/60";
  };

  const getProgressStatus = (progress) => {
    if (!progress) return null;

    const { score, testCount, completion, lastScore } = progress;
    if (completion < 100) {
      // 4 test tamamlanmadıysa ilerleme ve son test skoru
      return `${completion}% (${testCount}/4) ${
        lastScore ? `- Son: %${lastScore.toFixed(0)}` : ""
      }`;
    }
    // 4 test tamamlandıysa son 4 testin ortalaması
    return `Başarı: %${score.toFixed(0)} (${testCount} Test)`;
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
