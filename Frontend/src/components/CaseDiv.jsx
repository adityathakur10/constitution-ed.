import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleSelection from "./ArticleSelection";

const CaseDiv = () => {
  const [caseData, setCaseData] = useState(null);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/game/cases");
        if (response.headers["content-type"]?.includes("application/json")) {
          setCaseData(response.data);
        } else {
          console.error("Received non-JSON response");
        }
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCaseData();
  }, []);

  const handleSelectClick = () => {
    setShowArticles(true);
  };

  if (!caseData) return <p>Loading case data...</p>;

  return (
    <>
      {!showArticles && (
        <div
          className="w-[60%] h-[60%] rounded-3xl p-4 flex flex-col items-center justify-center relative border-[5px] border-gray-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,240,240,0.8) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {caseData.cases?.length ? (
            <>
              <h1 className="text-5xl font-bold text-gray-700 absolute top-4">
                Case Details
              </h1>
              <h2 className="text-2xl font-bold text-gray-700 absolute top-[90px] px-4 py-2 border-b-[5px] border-gray-500">
                {caseData.cases[0].name}
              </h2>
              <p className="text-2xl text-center text-gray-600 w-[700px]">
                {caseData.cases[0].description}
              </p>
              <p className="text-sm text-gray-500">{caseData.cases[0].date}</p>
            </>
          ) : (
            <p className="text-gray-600">No case data available.</p>
          )}
          <button
            className="absolute bottom-10 px-9 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 transition duration-300 ease-in-out"
            onClick={handleSelectClick}
          >
            Select
          </button>
        </div>
      )}

      {showArticles && <ArticleSelection caseId={caseData.cases[0]._id} />}
    </>
  );
};

export default CaseDiv;
