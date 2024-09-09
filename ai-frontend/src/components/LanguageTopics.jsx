import React, { useState } from "react";
import axios from "axios";
import "./LanguageTopics.css"; 

function LanguageTopics({ fullData }) {
  const [pptLink, setPptLink] = useState("");

  const handleGeneratePPT = async (topic) => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate-ppt", { topic });
      setPptLink(response.data.link); 
    } catch (error) {
      console.error("Error generating PPT:", error);
    }
  };

  return (
    <div className="topics-container">
      {fullData.output.roadmap.map((item, idx) => (
        <div key={idx} className="day-container">
          <h2><u>Day: {item.day}</u></h2>
          <h3 id="topic"><u>Topic: {item.topics[0].topic}</u></h3>
          <h4>Description: </h4>
          <p>{item.topics[0].description}</p>

          <h4>Resources:</h4>
          <p>
            {item.topics[0].resources[0].resource_type}:{" "}
            <a href={item.topics[0].resources[0].link}>
              {item.topics[0].resources[0].link}
            </a>
          </p>
          <p>
            {item.topics[0].resources[1].channel}:{" "}
            <a href={item.topics[0].resources[1].link}>
              {item.topics[0].resources[1].link}
            </a>
          </p>

          <h4>Task:</h4>
          <p>{item.topics[0].task_format}</p>

          <button onClick={() => handleGeneratePPT(item.topics[0].topic)}>
            Generate PPT
          </button>

          {pptLink && (
            <div>
              <h5>PPT Generated:</h5>
              <a href={pptLink} download>
                Download PPT
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LanguageTopics;
