import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiActivity,
  FiBarChart2,
  FiClock,
  FiTarget,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { db, COLLECTIONS } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { CATEGORIES, CATEGORY_NAMES } from "../data/questions";

export const Dashboard = () => {
  const { user } = useApp();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);
  const [currentWrongAnswerIndex, setCurrentWrongAnswerIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Test seçildiğinde wrong answer indexini sıfırla
  useEffect(() => {
    setCurrentWrongAnswerIndex(0);
    setIsFlipped(false);
    setShowAllQuestions(false);
  }, [selectedTestIndex]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("User Data:", data);
          console.log("Progress:", data.progress);
          console.log("Results:", data.results);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  // Son test sonuçlarını al ve tarihe göre sırala
  const allResults = Object.entries(userData?.progress || {})
    .flatMap(([category, data]) => {
      if (data.results) {
        return data.results.map((result) => ({
          ...result,
          category,
          timestamp:
            result.timestamp?.toDate?.() ||
            new Date(result.timestamp) ||
            new Date(),
        }));
      }
      return [];
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  // Toplam test sayısını hesapla
  const totalTests = Object.values(userData?.progress || {}).reduce(
    (sum, cat) => sum + (cat.totalTests || cat.results?.length || 0),
    0
  );

  // Toplam süreyi hesapla (tüm test sonuçlarından)
  const totalTime = Object.values(userData?.progress || {}).reduce(
    (sum, cat) => {
      if (cat.results) {
        return (
          sum +
          cat.results.reduce(
            (timeSum, result) => timeSum + (result.timeSpent || 0),
            0
          )
        );
      }
      return sum;
    },
    0
  );

  // Ortalama başarı puanını hesapla (son test sonuçlarına göre)
  const averageScore =
    allResults.length > 0
      ? allResults.reduce(
          (sum, result) => sum + (result.score / result.totalQuestions) * 100,
          0
        ) / allResults.length
      : 0;

  const getMotivationalMessage = (score) => {
    if (score >= 95) {
      return "Mükemmel! Çalışmalarınızın karşılığını fazlasıyla alıyorsunuz. Bu seviyeyi korumaya devam edin!";
    } else if (score >= 85) {
      return "Harika ilerleme! Başarınız göz kamaştırıcı, biraz daha pratikle mükemmele ulaşabilirsiniz.";
    } else if (score >= 70) {
      return "İyi gidiyorsunuz! Düzenli pratikle daha da yükseklere çıkabilirsiniz.";
    } else if (score >= 50) {
      return "Gelişim gösteriyorsunuz. Biraz daha pratik yaparak başarınızı artırabilirsiniz.";
    } else if (score >= 30) {
      return "Başlangıç için fena değil. Düzenli çalışmayla hızla ilerleme kaydedebilirsiniz.";
    } else {
      return "Her başarı bir adımla başlar. Düzenli pratik yaparak hızla gelişebilirsiniz.";
    }
  };

  // Kategori bazlı performans hesaplama
  const categoryPerformance = Object.entries(userData?.progress || {})
    .map(([category, data]) => {
      const results = data.results || [];
      const score =
        results.length > 0
          ? results.reduce(
              (sum, result) =>
                sum + (result.score / result.totalQuestions) * 100,
              0
            ) / results.length
          : 0;

      return {
        category,
        score,
        totalTests: results.length,
      };
    })
    .filter((cat) => cat.totalTests > 0);

  // En iyi kategoriyi bul
  const bestCategory = [...categoryPerformance].sort(
    (a, b) => b.score - a.score
  )[0]?.category;

  // En düşük performans gösterilen kategorileri bul
  const weakestCategories = [...categoryPerformance]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const handlePrevQuestion = (wrongAnswers) => {
    if (!wrongAnswers || currentWrongAnswerIndex <= 0) return;
    setIsFlipped(false);
    setCurrentWrongAnswerIndex((prev) => prev - 1);
  };

  const handleNextQuestion = (wrongAnswers) => {
    if (!wrongAnswers || currentWrongAnswerIndex >= wrongAnswers.length - 1)
      return;
    setIsFlipped(false);
    setCurrentWrongAnswerIndex((prev) => prev + 1);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleQuestionSelect = (index) => {
    setCurrentWrongAnswerIndex(index);
    setShowAllQuestions(false);
    setIsFlipped(false);
  };

  const handleTestClick = (index) => {
    if (selectedTestIndex === index) {
      // Zaten açıksa kapat
      setSelectedTestIndex(null);
    } else {
      // Yeni test seç
      setSelectedTestIndex(index);
      setCurrentWrongAnswerIndex(0);
      setIsFlipped(false);
      setShowAllQuestions(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h2>
      </div>

      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <FiActivity className="text-2xl text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toplam Test
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalTests}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiBarChart2 className="text-2xl text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ortalama Başarı
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {averageScore.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiTarget className="text-2xl text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                En İyi Kategori
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {bestCategory ? CATEGORY_NAMES[bestCategory] : "-"}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiClock className="text-2xl text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toplam Süre
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatTime(totalTime)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Kategori Bazlı Performans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Kategori Bazlı Performans
          </h3>
          <div className="space-y-4">
            {categoryPerformance.map(({ category, score, totalTests }) => (
              <div key={category} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {CATEGORY_NAMES[category]}
                  </span>
                  <span className="text-gray-800 dark:text-white font-medium">
                    {score.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${
                      score >= 90
                        ? "bg-green-500"
                        : score >= 70
                        ? "bg-green-400"
                        : score >= 50
                        ? "bg-yellow-400"
                        : score >= 30
                        ? "bg-orange-400"
                        : "bg-red-400"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Gelişim Önerileri
          </h3>
          {weakestCategories.length > 0 ? (
            <div className="space-y-4">
              {weakestCategories.map(({ category, score }) => (
                <div
                  key={category}
                  className={`p-4 rounded-lg border ${
                    score >= 90
                      ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20"
                      : score >= 70
                      ? "bg-green-50/80 dark:bg-green-900/5 border-green-100/80 dark:border-green-900/10"
                      : score >= 50
                      ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/20"
                      : score >= 30
                      ? "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/20"
                      : "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20"
                  }`}
                >
                  <h4
                    className={`font-medium mb-2 ${
                      score >= 90
                        ? "text-green-800 dark:text-green-200"
                        : score >= 70
                        ? "text-green-700 dark:text-green-300"
                        : score >= 50
                        ? "text-yellow-800 dark:text-yellow-200"
                        : score >= 30
                        ? "text-orange-800 dark:text-orange-200"
                        : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {CATEGORY_NAMES[category]}
                  </h4>
                  <p
                    className={`text-sm mb-2 ${
                      score >= 90
                        ? "text-green-600 dark:text-green-300"
                        : score >= 70
                        ? "text-green-600 dark:text-green-400"
                        : score >= 50
                        ? "text-yellow-600 dark:text-yellow-300"
                        : score >= 30
                        ? "text-orange-600 dark:text-orange-300"
                        : "text-red-600 dark:text-red-300"
                    }`}
                  >
                    Bu kategoride ortalama başarınız {score.toFixed(1)}%
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        score >= 90
                          ? "bg-green-500"
                          : score >= 70
                          ? "bg-green-400"
                          : score >= 50
                          ? "bg-yellow-400"
                          : score >= 30
                          ? "bg-orange-400"
                          : "bg-red-400"
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getMotivationalMessage(score)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Henüz yeterli test verisi bulunmamaktadır.
            </p>
          )}
        </motion.div>
      </div>

      {/* Son Test Sonuçları */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Son Test Sonuçları
        </h3>

        {allResults.slice(0, 5).map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer"
            onClick={() => handleTestClick(index)}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-gray-800 dark:text-white">
                    {CATEGORY_NAMES[result.category]}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      (result.score / result.totalQuestions) * 100 >= 70
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                    }`}
                  >
                    {((result.score / result.totalQuestions) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiClock className="text-gray-400" />
                    {formatTime(result.timeSpent)}
                  </span>
                  <span>
                    {result.timestamp.toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {result.wrongAnswers && result.wrongAnswers.length > 0 && (
                    <span className="ml-2">
                      {selectedTestIndex === index ? (
                        <FiChevronUp className="text-gray-400" />
                      ) : (
                        <FiChevronDown className="text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {selectedTestIndex === index &&
                  result.wrongAnswers &&
                  result.wrongAnswers.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Test Detayları
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                        <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                          <span className="font-medium text-green-800 dark:text-green-200">
                            Doğru Sayısı:
                          </span>
                          <span className="ml-2 text-green-600 dark:text-green-300">
                            {result.score} / {result.totalQuestions}
                          </span>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                          <span className="font-medium text-red-800 dark:text-red-200">
                            Yanlış Sayısı:
                          </span>
                          <span className="ml-2 text-red-600 dark:text-red-300">
                            {result.totalQuestions - result.score}
                          </span>
                        </div>
                      </div>

                      {/* Yanlış Cevaplar - Flashcard Style */}
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {showAllQuestions ? (
                          // Tüm Sorular Görünümü
                          <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                Yanlış Cevaplar
                              </h4>
                              <button
                                onClick={() => setShowAllQuestions(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                <FiX className="text-xl" />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                              {result.wrongAnswers.map((wrong, idx) => (
                                <motion.button
                                  key={idx}
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleQuestionSelect(idx)}
                                  className={`p-4 rounded-xl text-center shadow-sm transition-all duration-200 ${
                                    currentWrongAnswerIndex === idx
                                      ? "bg-gradient-to-br from-blue-500/90 to-blue-600/90 text-white shadow-blue-500/20"
                                      : "bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-700/90 dark:to-gray-800/90 text-gray-700 dark:text-gray-300 hover:shadow-lg"
                                  }`}
                                >
                                  {idx + 1}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Flashcard Görünümü
                          <div className="h-[400px] perspective-1000">
                            <motion.div
                              className="relative w-full h-full cursor-pointer group"
                              initial={false}
                              animate={{ rotateY: isFlipped ? 180 : 0 }}
                              transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 50,
                              }}
                              onClick={handleCardClick}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              {/* Ön Yüz - Soru ve Kullanıcının Cevabı */}
                              <div
                                className="absolute w-full h-full rounded-2xl p-8 flex flex-col bg-gradient-to-br from-gray-700/95 to-gray-800/95 shadow-lg backdrop-blur-sm group-hover:shadow-gray-500/20 transition-shadow duration-300"
                                style={{ backfaceVisibility: "hidden" }}
                              >
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                  <div className="bg-white/5 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
                                    <h3 className="text-lg font-medium text-gray-100">
                                      Soru{" "}
                                      {result.wrongAnswers[
                                        currentWrongAnswerIndex
                                      ].questionIndex + 1}
                                    </h3>
                                  </div>
                                  <div className="bg-white/5 rounded-2xl p-6 mb-8 w-full backdrop-blur-sm">
                                    <p className="text-xl text-gray-100 leading-relaxed">
                                      {
                                        result.wrongAnswers[
                                          currentWrongAnswerIndex
                                        ].question
                                      }
                                    </p>
                                  </div>
                                  <div className="bg-red-400/10 rounded-xl p-4 w-full backdrop-blur-sm">
                                    <p className="text-sm text-red-100 mb-2">
                                      Senin Cevabın:
                                    </p>
                                    <p className="text-lg font-medium text-red-200">
                                      {
                                        result.wrongAnswers[
                                          currentWrongAnswerIndex
                                        ].userAnswer
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-300/80 mt-4">
                                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5">
                                    <FiChevronUp className="text-lg" />
                                  </span>
                                  <span className="text-sm">
                                    Doğru cevabı görmek için tıkla
                                  </span>
                                </div>
                              </div>

                              {/* Arka Yüz - Doğru Cevap */}
                              <div
                                className="absolute w-full h-full rounded-2xl p-8 flex flex-col bg-gradient-to-br from-emerald-700/95 to-emerald-800/95 shadow-lg backdrop-blur-sm group-hover:shadow-emerald-500/20 transition-shadow duration-300"
                                style={{
                                  backfaceVisibility: "hidden",
                                  transform: "rotateY(180deg)",
                                }}
                              >
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                  <div className="bg-white/5 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
                                    <h3 className="text-lg font-medium text-gray-100">
                                      Doğru Cevap
                                    </h3>
                                  </div>
                                  <div className="bg-white/5 rounded-2xl p-6 w-full backdrop-blur-sm">
                                    <FiCheckCircle className="text-4xl text-emerald-300 mx-auto mb-4" />
                                    <p className="text-2xl font-medium text-gray-100">
                                      {
                                        result.wrongAnswers[
                                          currentWrongAnswerIndex
                                        ].correctAnswer
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-300/80 mt-4">
                                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5">
                                    <FiChevronDown className="text-lg" />
                                  </span>
                                  <span className="text-sm">
                                    Soruyu görmek için tıkla
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}

                        {/* Navigasyon */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handlePrevQuestion(result.wrongAnswers)
                              }
                              disabled={currentWrongAnswerIndex === 0}
                              className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-colors backdrop-blur-sm"
                            >
                              <FiChevronDown className="text-xl" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleNextQuestion(result.wrongAnswers)
                              }
                              disabled={
                                currentWrongAnswerIndex ===
                                result.wrongAnswers.length - 1
                              }
                              className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-colors backdrop-blur-sm"
                            >
                              <FiChevronUp className="text-xl" />
                            </motion.button>
                          </div>
                          <button
                            onClick={() =>
                              setShowAllQuestions(!showAllQuestions)
                            }
                            className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-xl transition-colors backdrop-blur-sm"
                          >
                            {currentWrongAnswerIndex + 1} /{" "}
                            {result.wrongAnswers.length}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {allResults.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Henüz test sonucunuz bulunmamaktadır.
          </div>
        )}
      </motion.div>
    </div>
  );
};
