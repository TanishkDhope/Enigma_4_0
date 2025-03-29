import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import FaceDetectionComponent from "./face";
import AudioTracking from "../components/AudioTracking";

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Questions data
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "8", "10", "12"],
      answer: "8",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Jane Austen",
      ],
      answer: "William Shakespeare",
    },
  ];

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(300);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Tab visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      setShowPopup(!isVisible);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Timer management
  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setShowScore(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(".question-container", 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        onStart: () => setIsTransitioning(true),
        onComplete: () => setIsTransitioning(false),
      }
    );
  }, [currentQuestion]);

  // Navigation handlers
  const handleQuestionClick = useCallback((index) => {
    setCurrentQuestion(index);
    setSelectedOption(null);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(prev => prev + 1);
      }
      setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
      setSelectedOption(null);
    }, 300);
  }, [selectedOption, currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(null);
    }, 300);
  }, [currentQuestion]);

  // Restart exam
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimer(300);
    setShowScore(false);
    setSelectedOption(null);
    setAttemptedQuestions(new Set());
  };

  // Time formatter
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col md:flex-row p-8 gap-6 relative">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Questions</h2>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {questions.map((_, index) => (
            <div
              key={index}
              onClick={() => handleQuestionClick(index)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all
                ${attemptedQuestions.has(index)
                  ? "bg-green-500/90 text-white"
                  : "bg-gray-100 hover:bg-blue-100"}
                ${currentQuestion === index ? "ring-2 ring-blue-500" : ""}`}
            >
              <span className="font-medium">Question {index + 1}</span>
              <div className={`w-2 h-2 rounded-full ${attemptedQuestions.has(index) ? "bg-white" : "bg-gray-400"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {examId.replace(/-/g, " ").toUpperCase()}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Total Questions: {questions.length}
            </p>
          </div>
          <div className="bg-blue-100 px-6 py-3 rounded-lg shadow-sm">
            <span className="text-2xl font-bold text-blue-600">
              {formatTime(timer)}
            </span>
          </div>
        </div>

        {/* Question Area */}
        {showScore ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Exam Completed!
            </h2>
            <p className="text-2xl text-gray-700 mb-8">
              Score: {score}/{questions.length}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Restart Exam
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
              >
                Return Home
              </button>
            </div>
          </div>
        ) : (
          <div className="question-container flex-1 flex flex-col">
            {/* Question Content */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
                  Question {currentQuestion + 1}
                </span>
                <div className="h-1 flex-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h3>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex-1">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isTransitioning && setSelectedOption(option)}
                  className={`p-6 text-left rounded-xl transition-all
                    ${selectedOption === option
                      ? "bg-blue-600 text-white ring-4 ring-blue-300"
                      : "bg-gray-100 hover:bg-blue-50 text-gray-800"}
                    ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isTransitioning}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center border-t pt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestion === 0 || isTransitioning}
              >
                ← Previous
              </button>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {currentQuestion + 1} of {questions.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedOption || isTransitioning}
                >
                  {currentQuestion === questions.length - 1 ? "Finish Exam" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Media Monitoring Section */}
      {!isMobile && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border-2 border-blue-200">
            <div className="w-48 h-36 rounded-md overflow-hidden bg-gray-100">
              <FaceDetectionComponent />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2 font-medium">
              Face Detection
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border-2 border-blue-200">
            <div className="w-48 h-36 rounded-md bg-gray-100 flex items-center justify-center">
              <AudioTracking />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2 font-medium">
              Audio Monitoring
            </p>
          </div>
        </div>
      )}

      {/* Tab Switch Warning Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam Paused</h2>
            <p className="text-gray-600 mb-6">
              You've switched away from the exam window. Multiple instances of this behavior may result in exam termination.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 w-full transition-transform transform hover:scale-105"
            >
              Return to Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;