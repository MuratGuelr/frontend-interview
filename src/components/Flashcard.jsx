import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiRotateCw,
  FiX,
  FiShuffle,
} from "react-icons/fi";

const cardVariants = {
  front: {
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 50,
    },
  },
  back: {
    rotateY: 180,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 50,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

const QuestionPreviewModal = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  onSelect,
}) => {
  if (!isOpen) return null;

  // Zorluk seviyesi için renk ve etiket belirleme
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return {
          bg: "bg-green-500/20",
          text: "text-green-300",
          label: "Kolay",
        };
      case "medium":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          label: "Orta",
        };
      case "hard":
        return {
          bg: "bg-red-500/20",
          text: "text-red-300",
          label: "Zor",
        };
      default:
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          label: "Belirsiz",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Soru Listesi</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="text-gray-400 hover:text-white text-xl" />
          </button>
        </div>

        <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {questions.map((q, index) => {
            const difficultyStyle = getDifficultyStyle(q.difficulty);

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(index);
                  onClose();
                }}
                className={`p-4 rounded-xl text-left transition-all ${
                  currentIndex === index
                    ? "bg-primary-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-black/20 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}
                    >
                      {difficultyStyle.label}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-3 mt-2">{q.question}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Flashcard = ({
  question,
  questions,
  currentIndex,
  total,
  onNext,
  onPrev,
  onJumpTo,
  isRandomMode,
  onToggleRandomMode,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setIsFlipped(false);
    onNext();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setIsFlipped(false);
    onPrev();
  };

  const handleSelectQuestion = (index) => {
    onJumpTo(index);
    setIsFlipped(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleRandomMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isRandomMode
                ? "bg-primary-600 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            <FiShuffle
              className={`${isRandomMode ? "animate-spin-slow" : ""}`}
            />
            <span>
              {isRandomMode ? "Sıralı Moda Geç" : "Rastgele Moda Geç"}
            </span>
          </motion.button>
        </div>

        <div className="h-96 mb-8 perspective-1000 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: direction * 100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction * -100,
              }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <motion.div
                className="relative w-full h-full cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.65,
                  type: "spring",
                  stiffness: 50,
                  damping: 12,
                }}
                onClick={handleFlip}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute w-full h-full rounded-2xl p-8 flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    background:
                      "linear-gradient(135deg, rgb(47, 63, 90) 0%, rgb(15, 23, 42) 100%)",
                  }}
                >
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            question.difficulty === "easy"
                              ? "bg-green-500/20 text-green-300"
                              : question.difficulty === "medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {question.difficulty === "easy"
                            ? "Kolay"
                            : question.difficulty === "medium"
                            ? "Orta"
                            : "Zor"}
                        </span>
                      </motion.div>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-medium text-gray-100 text-center leading-relaxed"
                    >
                      {question.question}
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6"
                  >
                    <FiRotateCw className="animate-spin-slow" />
                    <span>Cevabı görmek için tıklayın</span>
                  </motion.div>
                </div>

                <div
                  className="absolute w-full h-full rounded-2xl p-8 flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background:
                      "linear-gradient(135deg, rgb(1, 109, 163) 0%, rgb(0, 59, 90) 100%)",
                  }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-medium text-white text-center leading-relaxed"
                    >
                      {question.answer}
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 text-sm text-blue-100 mt-6"
                  >
                    <FiRotateCw className="animate-spin-slow" />
                    <span>Soruyu görmek için tıklayın</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-4">
          <motion.button
            variants={buttonVariants}
            whileHover={currentIndex === 0 ? undefined : "hover"}
            whileTap={currentIndex === 0 ? undefined : "tap"}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 text-gray-200 rounded-xl border border-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-gray-700 enabled:hover:shadow-md"
          >
            <FiChevronLeft className="text-lg" />
            <span className="font-medium">Önceki</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {currentIndex + 1} / {total}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover={currentIndex === total - 1 ? undefined : "hover"}
            whileTap={currentIndex === total - 1 ? undefined : "tap"}
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 text-gray-200 rounded-xl border border-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-gray-700 enabled:hover:shadow-md"
          >
            <span className="font-medium">Sonraki</span>
            <FiChevronRight className="text-lg" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        <QuestionPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={questions || []}
          currentIndex={currentIndex}
          onSelect={handleSelectQuestion}
        />
      </AnimatePresence>
    </>
  );
};
