// MCQForm.jsx
import React, { useState } from 'react';
import { db, collection, addDoc } from '../../Firebase/firebase';
// import './Styles/MCQForm.css'; // Custom CSS for styling Dikkat

const MCQForm = () => {
  const [examDetails, setExamDetails] = useState({
    examName: '',
    examTime: '',
    teacher: '',
    totalMarks: '',
    numQuestions: '',
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  const [currentMarks, setCurrentMarks] = useState('');
  const [status, setStatus] = useState('');

  // Handle exam details change
  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails({
      ...examDetails,
      [name]: value,
    });
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    if (
      !currentQuestion ||
      !currentCorrectAnswer ||
      currentOptions.includes('') ||
      !currentMarks
    ) {
      alert('Please fill out all fields.');
      return;
    }

    const newQuestion = {
      questionText: currentQuestion,
      options: currentOptions,
      correctAnswer: currentCorrectAnswer,
      marks: currentMarks,
    };

    setQuestions([...questions, newQuestion]);
    // Clear current input fields after adding the question
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCurrentCorrectAnswer('');
    setCurrentMarks('');
  };

  // Handle deleting a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  // Handle option change for a question
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  // Handle uploading all questions to Firebase
  const handleUploadExam = async () => {
    if (
      questions.length === 0 ||
      !examDetails.examName ||
      !examDetails.examTime ||
      !examDetails.teacher ||
      !examDetails.totalMarks ||
      !examDetails.numQuestions
    ) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // First, add exam details to Firestore
      const examRef = await addDoc(collection(db, 'exams'), {
        examName: examDetails.examName,
        examTime: examDetails.examTime,
        teacher: examDetails.teacher,
        totalMarks: examDetails.totalMarks,
        numQuestions: examDetails.numQuestions,
        questions: questions,
      });

      setStatus('Exam uploaded successfully!');
      setExamDetails({
        examName: '',
        examTime: '',
        teacher: '',
        totalMarks: '',
        numQuestions: '',
      }); // Reset form
      setQuestions([]); // Clear questions after upload
    } catch (error) {
      setStatus('Error uploading exam: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Enter MCQ Exam Details and Questions</h1>
      <form className="exam-form">
        {/* Exam Details */}
        <h2>Exam Details</h2>
        <div className="input-group">
          <label>Exam Name:</label>
          <input
            type="text"
            name="examName"
            value={examDetails.examName}
            onChange={handleExamDetailsChange}
            placeholder="Enter Exam Name"
          />
        </div>
        <div className="input-group">
          <label>Exam Time (in minutes):</label>
          <input
            type="number"
            name="examTime"
            value={examDetails.examTime}
            onChange={handleExamDetailsChange}
            placeholder="Enter Exam Time"
          />
        </div>
        <div className="input-group">
          <label>Teacher Name:</label>
          <input
            type="text"
            name="teacher"
            value={examDetails.teacher}
            onChange={handleExamDetailsChange}
            placeholder="Enter Teacher's Name"
          />
        </div>
        <div className="input-group">
          <label>Total Marks:</label>
          <input
            type="number"
            name="totalMarks"
            value={examDetails.totalMarks}
            onChange={handleExamDetailsChange}
            placeholder="Enter Total Marks"
          />
        </div>
        <div className="input-group">
          <label>Number of Questions:</label>
          <input
            type="number"
            name="numQuestions"
            value={examDetails.numQuestions}
            onChange={handleExamDetailsChange}
            placeholder="Enter Number of Questions"
          />
        </div>

        {/* Question Entry Section */}
        <h2>Add Questions</h2>
        <div className="input-group">
          <label>Question Text:</label>
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Enter your question"
          />
        </div>
        <div className="input-group">
          <label>Options:</label>
          {currentOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div className="input-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            value={currentCorrectAnswer}
            onChange={(e) => setCurrentCorrectAnswer(e.target.value)}
            placeholder="Enter the correct answer"
          />
        </div>
        <div className="input-group">
          <label>Marks for this Question:</label>
          <input
            type="number"
            value={currentMarks}
            onChange={(e) => setCurrentMarks(e.target.value)}
            placeholder="Enter marks"
          />
        </div>
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        {/* Question Panel */}
        <div className="question-panel">
          <h3>Added Questions</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                <div className="question-item">
                  <strong>Q{index + 1}: {q.questionText}</strong>
                  <p>Options: {q.options.join(', ')}</p>
                  <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                  <p><strong>Marks:</strong> {q.marks}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button type="button" onClick={handleUploadExam}>
          Upload Exam
        </button>

        {/* Status Message */}
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default MCQForm;
