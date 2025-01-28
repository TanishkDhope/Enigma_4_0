import React, { useEffect } from "react";
import { gsap } from "gsap";

const Footer = () => {
  useEffect(() => {
    // Fade in footer
    gsap.fromTo(
      ".footer-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="footer-text">&copy; 2025 ExamPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;