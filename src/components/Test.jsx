import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiClock, FiPlay, FiCheckCircle, FiPause, FiX } from "react-icons/fi";
import {
  CATEGORIES,
  CATEGORY_NAMES,
  getQuestionsByCategory,
} from "../data/questions";
import { updateProgress } from "../firebase/progress";
import { useApp } from "../context/AppContext";

// Soruları karıştırmak için yardımcı fonksiyon
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Soru seçeneklerini karıştırmak için yardımcı fonksiyon
const shuffleQuestion = (question) => {
  const options = [...question.options];
  const correctOption = options[question.correctOption];

  // Seçenekleri karıştır
  const shuffledOptions = shuffleArray(options);

  // Yeni doğru cevap indeksini bul
  const newCorrectOption = shuffledOptions.indexOf(correctOption);

  return {
    ...question,
    options: shuffledOptions,
    correctOption: newCorrectOption,
  };
};

export const Test = ({ onComplete, onCancel }) => {
  const { user, currentCategory } = useApp();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isStarted) {
      const shuffled = shuffleArray(getQuestionsByCategory(selectedCategory))
        .slice(0, 10) // 10 soru al
        .map(shuffleQuestion); // Her sorunun seçeneklerini karıştır
      setShuffledQuestions(shuffled);
    }
  }, [isStarted, selectedCategory]);

  useEffect(() => {
    let timer;
    if (isStarted && !isComplete && !isPaused) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isComplete, isPaused]);

  const handleAnswerSelect = (index) => {
    if (!isPaused) {
      setSelectedAnswer(index);
    }
  };

  const handleNext = async () => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctOption;

    if (!isCorrect) {
      setWrongAnswers([
        ...wrongAnswers,
        {
          questionIndex: currentQuestionIndex,
          question: currentQuestion.question,
          userAnswer: currentQuestion.options[selectedAnswer],
          correctAnswer: currentQuestion.options[currentQuestion.correctOption],
        },
      ]);
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      if (isSubmitting) return; // Eğer zaten gönderiliyor ise işlemi durdur
      setIsSubmitting(true); // Gönderim başladığını işaretle

      setIsComplete(true);
      const timestamp = new Date();
      const finalScore = score + (isCorrect ? 1 : 0);

      // Son yanlış cevabı da ekleyelim
      const finalWrongAnswers = isCorrect
        ? wrongAnswers
        : [
            ...wrongAnswers,
            {
              questionIndex: currentQuestionIndex,
              question: currentQuestion.question,
              userAnswer: currentQuestion.options[selectedAnswer],
              correctAnswer:
                currentQuestion.options[currentQuestion.correctOption],
            },
          ];

      const results = {
        score: finalScore,
        timeSpent,
        wrongAnswers: finalWrongAnswers,
        totalQuestions: shuffledQuestions.length,
        category: selectedCategory,
        timestamp,
        qualifiesForLeaderboard: finalScore >= 8,
      };

      if (user && selectedCategory !== CATEGORIES.ALL) {
        try {
          await updateProgress(user.uid, selectedCategory, results);
        } catch (error) {
          console.error("Error updating user progress:", error);
        }
      }

      onComplete(results);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleCancelTest = () => {
    if (showConfirmCancel) {
      setShowConfirmCancel(false);
      setIsStarted(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setTimeSpent(0);
      setWrongAnswers([]);
      setShuffledQuestions([]);
      setIsPaused(false);
      onCancel();
    } else {
      setShowConfirmCancel(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isStarted) {
    const categoryQuestions = getQuestionsByCategory(selectedCategory);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Test Kategorisi Seçin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(key)}
              className={`p-6 rounded-xl text-left transition-all ${
                selectedCategory === key
                  ? "bg-slate-700 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  selectedCategory === key
                    ? "text-white"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {name}
              </h3>
              <p
                className={`text-sm ${
                  selectedCategory === key
                    ? "text-white/80"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Bu kategoride {getQuestionsByCategory(key).length} soru
                bulunmaktadır
              </p>
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {CATEGORY_NAMES[selectedCategory]} kategorisinde
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {Math.min(10, categoryQuestions.length)} soru ile kendinizi test
            edin.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsStarted(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <FiPlay />
            <span>Teste Başla</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!shuffledQuestions.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary-500 dark:border-t-primary-400"></div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="text-gray-600 dark:text-gray-300">
            Soru {currentQuestionIndex + 1}/{shuffledQuestions.length}
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FiClock />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isPaused ? (
              <FiPlay className="text-xl text-primary-500" />
            ) : (
              <FiPause className="text-xl text-gray-600 dark:text-gray-400" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancelTest}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FiX className="text-xl text-red-500" />
          </motion.button>
        </div>
      </div>

      {showConfirmCancel && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
        >
          <p className="text-red-500 dark:text-red-400 text-center mb-4">
            Testi iptal etmek istediğinize emin misiniz?
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirmCancel(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Vazgeç
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowConfirmCancel(false);
                setIsStarted(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore(0);
                setTimeSpent(0);
                setWrongAnswers([]);
                setShuffledQuestions([]);
                setIsPaused(false);
                onCancel();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Testi İptal Et
            </motion.button>
          </div>
        </motion.div>
      )}

      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Test Duraklatıldı
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(false)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <FiPlay />
              <span>Devam Et</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 ${
          isPaused ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <p className="text-xl text-gray-800 dark:text-white mb-6">
          {currentQuestion.question}
        </p>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-xl transition-colors ${
                selectedAnswer === index
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={selectedAnswer === null || isPaused || isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-800 transition-colors"
        >
          {currentQuestionIndex === shuffledQuestions.length - 1 ? (
            <>
              <FiCheckCircle />
              <span>
                {isSubmitting ? "Test Tamamlanıyor..." : "Testi Bitir"}
              </span>
            </>
          ) : (
            <span>Sonraki Soru</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
