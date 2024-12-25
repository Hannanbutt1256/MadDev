import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-black text-light-text dark:text-dark-text">
      <div className="bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase.</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
