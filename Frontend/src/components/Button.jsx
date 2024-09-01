import React from "react";

const Button = ({ onClick }) => {
  return (
    <div>
  <button
            className="px-9 py-5 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-5xl font-semibold rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 transition duration-300 ease-in-out flex align-middle justify-center"
            onClick={onClick}
          >
            Play Game
          </button>
    </div>
  );
};

export default Button;
