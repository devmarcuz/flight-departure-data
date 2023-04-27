import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
