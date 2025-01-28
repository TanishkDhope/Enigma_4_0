import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import FaceDetectionComponent from "./face";

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());

  useEffect(() => {
    // GSAP animations for the question container
    // gsap.fromTo(
    //   ".question-container",
    //   { opacity: 0, y: 20 },
    //   { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    // );

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // If the timer reaches zero, show the score
    if (timer === 0) {
      setShowScore(true);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timer]);

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 1); // Increment score if the answer is correct
      }
      setAttemptedQuestions((prev) => new Set(prev.add(currentQuestion)));
    }
    setSelectedOption(null); // Reset selected option for the next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true); // End of the exam
    }
  };

  const handlePrevious = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimer(300);
    setShowScore(false);
    setSelectedOption(null);
    setAttemptedQuestions(new Set());
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col md:flex-row p-6">
      {/* Side Panel */}
      <div className="w-full md:w-1/4 bg-white text-gray-900 rounded-lg shadow-xl p-6 mr-6 mb-6 md:mb-0 flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Questions</h2>
        <div className="space-y-4 w-full">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                attemptedQuestions.has(index)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-blue-300"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              <span>Q{index + 1}</span>
              <span
                className={`w-3 h-3 rounded-full ${
                  attemptedQuestions.has(index) ? "bg-white" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-white text-gray-900 rounded-lg shadow-xl p-8 flex flex-col items-center justify-between">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-blue-600">
              Exam Completed
            </h2>
            <p className="text-2xl">
              Your score is: <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <div className="mt-8">
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition"
                onClick={handleRestart}
              >
                Restart Exam
              </button>
              <button
                className="ml-4 bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-col justify-between items-center mb-2 w-full">
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-3xl font-bold text-gray-800">
                  Exam: {examId.replace("-", " ")}
                </h2>
                <p className="text-lg font-semibold bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                  Time Left: {formatTime(timer)}
                </p>
              </div>
              <div className="question-container w-full mb-2 mt-24">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  Question {currentQuestion + 1} of {questions.length}
                </h3>
                <p className="text-xl mb-4 text-gray-700">
                  {questions[currentQuestion].question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={`px-6 py-4 rounded-lg shadow-lg text-lg transition-all w-full ${
                        selectedOption === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt w-full flex justify-between">
                  <button
                    onClick={handlePrevious}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-500 transition"
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-4 left-4 w-40 h-40 bg-white border rounded-lg shadow-lg">
        <FaceDetectionComponent />
      </div>
    </div>
  );
};

export default ExamPage;
