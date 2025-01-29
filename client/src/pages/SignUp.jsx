import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../hooks/getUserInfo";
import { PDFDocument } from "pdf-lib"; 
import { GoogleGenerativeAI } from "@google/generative-ai";
//import Particle from "./Particle";

const genAI = new GoogleGenerativeAI("AIzaSyC7PPJjAnP1MQbRntjSeNunv9TNaDT_-w8"); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    role: "user",
    idCard: null,
  });

  const { name, email, userId, isAuth } = getUserInfo();

  const navigate = useNavigate();

  const onHandleLogin = () => {
    navigate("/login");
  };
  

  const createUser = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const authInfo = {
        userId: result.user.uid,
        name: formData.name,
        email: result.user.email,
        isAuth: true,
      };
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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

      const extractedText = await extractTextFromPDF(file);

      const response = await verifyWithAI(extractedText);
      console.log(response); 
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

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
    setSuccess("Signup successful!");
    createUser();
  };

  const extractTextFromPDF = async (pdfFile) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const text = await pdfDoc.getTextContent();
          let textContent = "";
          text.items.forEach((item) => {
            textContent += item.str + " ";
          });
          resolve(textContent);
        } catch (error) {
          reject("Error extracting text from PDF: " + error);
        }
      };
      fileReader.readAsArrayBuffer(pdfFile);
    });
  };


  const verifyWithAI = async (extractedText) => {
    try {
      const prompt = `Verify the following ID information: ${extractedText}`;
      const result = await model.generateContent(prompt);

      console.log(result.response.text());
      return result.response.text(); 
    } catch (error) {
      console.log("Error verifying with AI:", error);
      return "Error verifying the information.";
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-purple-500">
      {/* <Particle /> */}
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
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200 mt-4" onClick={onHandleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
