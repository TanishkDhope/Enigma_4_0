import React, { useState } from "react";
import { db, collection, addDoc } from "../../Firebase/firebase";

const MCQForm = () => {
  const [examDetails, setExamDetails] = useState({
    examName: "",
    examTime: "",
    teacher: "",
    totalMarks: "",
    numQuestions: "",
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");
  const [currentMarks, setCurrentMarks] = useState("");
  const [status, setStatus] = useState("");

  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({ ...examDetails, [name]: value });
  };

  const handleAddQuestion = () => {
    if (
      !currentQuestion ||
      !currentCorrectAnswer ||
      currentOptions.includes("") ||
      !currentMarks
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newQuestion = {
      questionText: currentQuestion,
      options: currentOptions,
      correctAnswer: currentCorrectAnswer,
      marks: currentMarks,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setCurrentOptions(["", "", "", ""]);
    setCurrentCorrectAnswer("");
    setCurrentMarks("");
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  const handleUploadExam = async () => {
    if (
      questions.length === 0 ||
      !examDetails.examName ||
      !examDetails.examTime ||
      !examDetails.teacher ||
      !examDetails.totalMarks ||
      !examDetails.numQuestions
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "exams"), {
        ...examDetails,
        questions,
      });

      setStatus("Exam uploaded successfully!");
      setExamDetails({
        examName: "",
        examTime: "",
        teacher: "",
        totalMarks: "",
        numQuestions: "",
      });
      setQuestions([]);
    } catch (error) {
      setStatus("Error uploading exam: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">MCQ Exam Form</h1>
      <form className="space-y-6">
        {/* Exam Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Exam Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Exam Name", name: "examName", type: "text", placeholder: "Enter Exam Name" },
              { label: "Exam Time (in minutes)", name: "examTime", type: "number", placeholder: "Enter Exam Time" },
              { label: "Teacher Name", name: "teacher", type: "text", placeholder: "Enter Teacher's Name" },
              { label: "Total Marks", name: "totalMarks", type: "number", placeholder: "Enter Total Marks" },
              { label: "Number of Questions", name: "numQuestions", type: "number", placeholder: "Enter Number of Questions" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={examDetails[field.name]}
                  onChange={handleExamDetailsChange}
                  placeholder={field.placeholder}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Question Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Questions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Enter your question"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
              <input
                type="text"
                value={currentCorrectAnswer}
                onChange={(e) => setCurrentCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks for this Question</label>
              <input
                type="number"
                value={currentMarks}
                onChange={(e) => setCurrentMarks(e.target.value)}
                placeholder="Enter marks"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Added Questions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Added Questions</h3>
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <strong className="block mb-1">Q{index + 1}: {q.questionText}</strong>
                <p className="text-gray-700">Options: {q.options.join(", ")}</p>
                <p className="text-gray-700"><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <p className="text-gray-700"><strong>Marks:</strong> {q.marks}</p>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleUploadExam}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
        >
          Upload Exam
        </button>

        {/* Status Message */}
        {status && (
          <p className={`mt-4 text-center ${status.includes("Error") ? "text-red-500" : "text-green-600"}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default MCQForm;