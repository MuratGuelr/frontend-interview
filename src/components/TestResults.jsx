import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiClock, FiAward, FiX, FiRepeat, FiTrendingUp } from "react-icons/fi";
import { CATEGORIES, CATEGORY_NAMES } from "../data/questions";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { getUserData } from "../firebase/users";

export const TestResults = ({ results, onStartNewTest }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const { score, timeSpent, totalQuestions, category } = results;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "test_results"),
          where("category", "==", category),
          orderBy("score", "desc"),
          orderBy("timeSpent", "asc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const leaderboardData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const userData = await getUserData(data.userId);
            return {
              id: doc.id,
              ...data,
              user: userData,
            };
          })
        );
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };

    fetchLeaderboard();
  }, [category]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Test Sonuçları
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {CATEGORY_NAMES[category] || "Tüm Konular"} kategorisinde test
            tamamlandı
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center">
              <FiAward className="text-3xl text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Puan
              </div>
              <div className="text-2xl font-bold text-gray-400 dark:text-white">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {score}/{totalQuestions} doğru
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center">
              <FiClock className="text-3xl text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Süre
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatTime(timeSpent)}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center">
              <FiX className="text-3xl text-red-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Yanlış
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalQuestions - score}
              </div>
            </div>
          </div>

          {/* Liderlik Tablosu */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTrendingUp />
              <span>Liderlik Tablosu</span>
            </h3>
            {isLoadingLeaderboard ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 dark:border-t-primary-400"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.slice(0, 3).map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl shadow-sm ${
                      index === 0
                        ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
                        : index === 1
                        ? "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200"
                        : "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm">
                        {entry.user?.photoURL ? (
                          <img
                            src={entry.user.photoURL}
                            alt={entry.user.displayName}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <FiAward
                            className={`text-2xl ${
                              index === 0
                                ? "text-yellow-500"
                                : index === 1
                                ? "text-gray-500"
                                : "text-orange-500"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">#{index + 1}</span>
                          <span className="text-sm font-medium">
                            {entry.user?.displayName || "Anonim Kullanıcı"}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                            {CATEGORY_NAMES[entry.category]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span className="flex items-center gap-1">
                            <FiAward className="text-primary-500" />
                            {Math.round(
                              (entry.score / entry.totalQuestions) * 100
                            ).toFixed(1)}
                            %
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock className="text-gray-500" />
                            {formatTime(entry.timeSpent)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(
                            entry.timestamp?.toDate()
                          ).toLocaleDateString("tr-TR")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {leaderboard.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    Henüz bu kategoride sonuç bulunmamaktadır.
                  </div>
                )}
              </div>
            )}
          </div>

          {!showConfirm ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <FiRepeat />
              <span>Yeni Test Başlat</span>
            </motion.button>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Yeni bir test başlatmak istediğinize emin misiniz?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartNewTest}
                  className="flex-1 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Evet, Başlat
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 dark:bg-red-800 dark:text-gray-200 rounded-xl hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                >
                  Vazgeç
                </motion.button>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700/50 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kendinizi geliştirmeye devam edin!
          </p>
        </div>
      </div>
    </motion.div>
  );
};
