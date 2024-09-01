import React, { useState, useEffect } from "react";
import axios from "axios";
import ArgumentSelection from "./ArgumentSelection";

const ArticleSelection = ({ caseId }) => {
  const [articles, setArticles] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/game/${caseId}/article`
        );
        if (response.headers["content-type"]?.includes("application/json")) {
          setArticles(response.data);
        } else {
          console.error("Received non-JSON response");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [caseId]);

  const handleArticleClick = (articleId) => {
    setSelectedArticleId(articleId);
  };

  if (!articles) return <p>Loading articles...</p>;

  return (
    <div className="mt-4 flex flex-wrap justify-center items-center">
      {!selectedArticleId ? (
        articles.map((article, index) => (
          <div
            key={index}
            className="w-[300px] h-[250px] m-4 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center text-center border-[4px] border-gray-500 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)",
            }}
            onClick={() => handleArticleClick(article.id)}
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {article.article}
            </h3>
            <p className="text-md text-gray-600">{article.description}</p>
          </div>
        ))
      ) : (
        <ArgumentSelection articleId={selectedArticleId} />
      )}
    </div>
  );
};

export default ArticleSelection;
