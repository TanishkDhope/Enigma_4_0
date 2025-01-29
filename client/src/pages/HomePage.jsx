import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom"; // For navigation
import { getUserInfo } from "../hooks/getUserInfo";
import FaceDetectionComponent from "./face"; // Importing FaceDetectionComponent
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import Particle from "./Particle";

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const { isAuth } = getUserInfo();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authInfo");
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  const exams = [
    {
      id: "national-scholarship",
      name: "National Scholarship Exam",
      date: "March 15, 2025",
    },
    {
      id: "engineering-entrance",
      name: "Engineering Entrance Exam",
      date: "April 10, 2025",
    },
    {
      id: "medical-entrance",
      name: "Medical Entrance Exam",
      date: "May 5, 2025",
    },
    {
      id: "management-aptitude",
      name: "Management Aptitude Test",
      date: "June 20, 2025",
    },
    {
      id: "joint-entrance",
      name: "Joint Entrance Examination",
      date: "July 22, 2025",
    },
    {
      id: "thadomal-entrance",
      name: "Thadomal Entrance Exam",
      date: "March 20, 2025",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      ".homepage-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".exams-section",
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (isAuth == "") {
      navigate("/signup");
    }
  }, []);

  const handleExamClick = (id) => {
    navigate(`/exam/${id}`); 
  };

  return (
    <div className="container mx-auto p-4 relative">
      <Particle />
      <section id="home" className="text-center my-10 homepage-title">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to ExamPro</h1>
        <p className="text-gray-600 mt-2">
          Your trusted platform for online exams with fairness and privacy.
        </p>
      </section>

      <section id="exams" className="my-10 exams-section">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Upcoming Exams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="p-4 border rounded-lg shadow-lg exam-card hover:shadow-2xl transition cursor-pointer"
              onClick={() => handleExamClick(exam.id)} 
            >
              <h3 className="text-xl font-semibold">{exam.name}</h3>
              <p className="text-gray-600">Date: {exam.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="my-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600">
          At ExamPro, we use cutting-edge AI technology to ensure a fair and
          transparent examination process while prioritizing the privacy and
          trust of all participants.
        </p>
      </section>

      {/* FaceDetectionComponent at the bottom-left corner */}
    </div>
  );
};

export default HomePage;
