import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  // 🔍 Simulate a search (you can improve this later)
  const data = [
    { title: "Home", content: "Welcome to Smart Setu AI" },
    { title: "Predictor", content: "AI-driven credit prediction" },
    { title: "Govt Schemes", content: "Explore government benefits" },
  ];

  const results = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Search Results for: <span className="text-green-500">"{query}"</span></h1>
      {results.length > 0 ? (
        results.map((r, idx) => (
          <div key={idx} className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p>{r.content}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;
