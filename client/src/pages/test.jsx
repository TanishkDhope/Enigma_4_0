import React, { useState, useEffect } from "react";

export const Test = () => {
  const [isTabActive, setIsTabActive] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      setIsTabActive(isVisible);

      // Show popup when the tab becomes inactive
      if (!isVisible) {
        setShowPopup(true);
      }
    };

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tab Visibility with Custom Popup</h1>
      <p className="mt-2">{isTabActive ? "Tab is active." : "Tab is inactive."}</p>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPopup(false)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-black">You left the tab!</h2>
            <p className="text-black">Come back to the tab for more updates.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
