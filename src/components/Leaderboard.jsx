import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiClock } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { db, COLLECTIONS } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { CATEGORIES, CATEGORY_NAMES } from "../data/questions";
import { getUserData } from "../firebase/users";

export const Leaderboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        let q;
        if (selectedCategory === CATEGORIES.ALL) {
          q = query(
            collection(db, COLLECTIONS.TEST_RESULTS),
            where("score", ">=", 8),
            orderBy("score", "desc"),
            orderBy("timeSpent", "asc"),
            limit(10)
          );
        } else {
          q = query(
            collection(db, COLLECTIONS.TEST_RESULTS),
            where("category", "==", selectedCategory),
            where("score", ">=", 8),
            orderBy("score", "desc"),
            orderBy("timeSpent", "asc"),
            limit(10)
          );
        }
        const querySnapshot = await getDocs(q);
        const results = await Promise.all(
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
        setLeaderboard(results);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedCategory]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getPositionStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200";
      case 1:
        return "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200";
      case 2:
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200";
      default:
        return "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Liderlik Tablosu
        </h2>
        <div className="flex gap-2">
          {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? "bg-slate-700 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {name}
            </motion.button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-700"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl shadow-sm ${getPositionStyle(index)}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm">
                  {result.user?.photoURL ? (
                    <img
                      src={result.user.photoURL}
                      alt={result.user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FiAward
                      className={`text-2xl ${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-500"
                          : index === 2
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">#{index + 1}</span>
                    <span className="text-sm font-medium">
                      {result.user?.displayName || "Anonim Kullanıcı"}
                    </span>
                    {selectedCategory === CATEGORIES.ALL && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                        {CATEGORY_NAMES[result.category]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className="flex items-center gap-1">
                      <FiAward className="text-primary-500" />
                      {((result.score / result.totalQuestions) * 100).toFixed(
                        1
                      )}
                      %
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-gray-500" />
                      {formatTime(result.timeSpent)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(result.timestamp.toDate()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
