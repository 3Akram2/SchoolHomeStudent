// LoadingBook.js
import React from "react";
import "../LoadingBook.css";
const LoadingBook = () => {
  return (
    <div className="loading-book-container">
      <div className="loading-book">
        <div className="cover"></div>
        <div className="page1"></div>
        <div className="page2"></div>
      </div>
    </div>
  );
};

export default LoadingBook;
