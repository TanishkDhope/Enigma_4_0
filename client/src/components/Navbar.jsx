import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { auth } from "../Firebase/firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const navigate=useNavigate()
  useEffect(() => {
    // Navbar fade-in effect
    gsap.fromTo(
      ".navbar-container",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate links on hover
    gsap.utils.toArray(".navbar-link").forEach((link) => {
      gsap.fromTo(
        link,
        { scale: 1 },
        {
          scale: 1.1,
          ease: "power1.inOut",
          paused: true,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
        }
      );
    });

    // Search bar animation
    gsap.fromTo(
      ".search-bar",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
  }, []);
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authInfo");
      navigate("/signup")
      
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4 navbar-container">
        {/* Logo */}
        <a href="/" className="text-3xl font-bold hover:scale-105 transition-transform">
          ExamPro
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className="navbar-link hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="navbar-link hover:text-blue-200 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="navbar-link hover:text-blue-200 transition-colors duration-200"
          >
            Contact Us
          </a>
          <button onClick={signOutUser} className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            SignOut
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center search-bar">
          <input
            type="text"
            placeholder="Search exams"
            className="px-4 py-2 bg-blue-500 text-white rounded-l-lg focus:ring-2 focus:ring-blue-300 outline-none transition-shadow duration-200"
          />
          <button className="bg-blue-700 px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-200">
            Search
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl hover:scale-110 transition-transform duration-200"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 shadow-lg">
          <a
            href="#home"
            className="block p-3 hover:bg-blue-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="block p-3 hover:bg-blue-600 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="block p-3 hover:bg-blue-600 transition-colors duration-200"
          >
            Contact Us
          </a>
          <button className="block w-full bg-blue-400 p-3 text-left hover:bg-blue-300 transition-colors duration-200 cursor-pointer" href="#login">
            SignUp/Login
          </button>
          <div className="flex items-center bg-blue-600 p-3">
            <input
              type="text"
              placeholder="Search exams"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-l-lg focus:ring-2 focus:ring-blue-300 outline-none transition-shadow duration-200"
            />
            <button className="bg-blue-700 px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
