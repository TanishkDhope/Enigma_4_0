import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../hooks/getUserInfo";
import { useAddInfo } from "../hooks/useAddInfo";
import CryptoJS from "crypto-js";   
import axios from "axios"; // For Cloudinary API

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    role: "user",
    idCard: null,
  });

  const { isAuth } = getUserInfo();
  const { addUser } = useAddInfo();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, idCard: file });
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const createUser = async () => {
    try {
      // Create a new user with Firebase
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Upload the ID Card PDF to Cloudinary
      const uploadedPDFUrl = await uploadToCloudinary(formData.idCard);
      const hashedURL = CryptoJS.SHA256(uploadedPDFUrl).toString();
     

      // Save user data to Firestore
      const authInfo = {
        userId: result.user.uid,
        name: formData.name,
        email: result.user.email,
        isAuth: true,
    
      };

      addUser({
        name: formData.name,
        email: result.user.email,
        userId: result.user.uid,
        role: "user",
        password: formData.password,
        branch: formData.branch,
        idCardUrl: uploadedPDFUrl, // Store in Firestore
      });

      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      setSuccess("Signup successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Error creating account. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.branch ||
      !formData.idCard
    ) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Uploading ID and creating account...");
    createUser();
  };

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "dzlr1rtln"); // Replace with your Cloudinary cloud name

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzlr1rtln/upload",
        formData
      );

      return response.data.secure_url; // Cloudinary's URL for the uploaded file
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw new Error("Failed to upload ID Card. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Signup
        </h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* Form fields for name, email, password, branch */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium text-black mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-black mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-black mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="branch"
              className="block text-md font-medium text-black mb-1"
            >
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" className="text-gray-400">
                Select your branch
              </option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="idCard"
              className="block text-md font-medium text-black mb-1"
            >
              Upload ID Card (PDF only)
            </label>
            <input
              type="file"
              id="idCard"
              name="idCard"
              accept=".pdf"
              onChange={handleFileUpload}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
