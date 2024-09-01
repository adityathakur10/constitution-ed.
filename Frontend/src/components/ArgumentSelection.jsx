import React, { useState, useEffect } from "react";
import axios from "axios";

const ArgumentSelection = ({ articleId }) => {
  const [argumentsData, setArgumentsData] = useState(null);

  useEffect(() => {
    const fetchArguments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/game/${articleId}/arguments`
        );
        console.log("Response:", response);

        if (response.headers["content-type"]?.includes("application/json")) {
          console.log("Data:", response.data);
          setArgumentsData(response.data);
        } else {
          console.error("Received non-JSON response");
        }
      } catch (error) {
        console.error("Error fetching arguments:", error);
      }
    };

    fetchArguments();
  }, [articleId]);

  if (!argumentsData) return <p>Loading arguments...</p>;

  return (
    <div className="mt-4 flex flex-wrap justify-center items-center">
      {argumentsData.map((argument, index) => (
        <div
          key={index}
          className="w-[300px] h-[250px] m-4 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center text-center border-[4px] border-gray-500 transition-transform transform hover:scale-105 hover:shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)",
          }}
        >
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            {argument.argumentOptions[0].arg1}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ArgumentSelection;
