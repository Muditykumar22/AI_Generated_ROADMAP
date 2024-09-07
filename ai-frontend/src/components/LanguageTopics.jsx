// import React from "react";

// function LanguageTopics({ fullData }) {
//   console.log(fullData);
//   return(
      
//       <>
//       <div>
//         WOrking
//          {fullData.output.roadmap.map((item,idx)=>{
//          console.log(item);
//          return(
//           // eslint-disable-next-line react/jsx-key
//           <div>
//             <h2>Day: {item.day}</h2>
//             <h3>Topic: {item.topics[0].topic} </h3>
//             <h3>Description: </h3>{item.topics[0].description}
//             <h4>Resourcse</h4>
//             {/* <p>Resource Type: </p> */}
//             <p>{item.topics[0].resources[0].resource_type}:<a href= {item.topics[0].resources[0].link}>{item.topics[0].resources[0].link}</a> </p>
//             <p>{item.topics[0].resources[1].channel}: <a href={item.topics[0].resources[1].link}> {item.topics[0].resources[1].link}</a></p>
//             <h4>Task</h4>
//             <p>{item.topics[0].task_format}</p>
//           </div>
//          )
//        })}
//       </div></>
//   );
// }


// export default LanguageTopics;

//   return (
//     <div className="topics-container">
//       {Object.keys(fullData).length > 0 ? (
//         Object.keys(fullData).map((language, languageIndex) => (
//           <div key={languageIndex}>
//             <h2>{language} Learning Plan</h2>
//             {fullData[language].length > 0 ? (
//               fullData[language].map((dayData, dayIndex) => (
//                 <div key={dayIndex}>
//                   <h3>Day {dayData.day}</h3>
//                   {dayData.topics.length > 0 ? (
//                     dayData.topics.map((topic, topicIndex) => (
//                       <div key={topicIndex}>
//                         <p><strong>Topic:</strong> {topic.topic}</p>
//                         <p><strong>Description:</strong> {topic.description}</p>
//                         <p><strong>Resources:</strong></p>
//                         <ul>
//                           {topic.resources.length > 0 ? (
//                             topic.resources.map((resource, resourceIndex) => (
//                               <li key={resourceIndex}>
//                                 <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                                   {resource.resource_type} - {resource.channel || resource.link}
//                                 </a>
//                               </li>
//                             ))
//                           ) : (
//                             <li>No resources available</li>
//                           )}
//                         </ul>
//                         <div>
//                           <h4>Tasks:</h4>
//                           <p>{topic.task_format}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No topics available for this day</p>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No days available for this language</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No learning plans available</p>
//       )}
//     </div>
//   );
// }
// import React from "react";
// import axios from "axios";

// function LanguageTopics({ fullData }) {

//   const handleGeneratePPT = async (topic) => {
//     try {
//       const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKUfCFalGlwsLXgwi4hOOUgWUJ3hylnHs", {
//         topic: topic
//       });
//       // Assuming the API returns a URL to download the PPT
//       if(response.data.pptUrl) {
//         window.open(response.data.pptUrl, "_blank"); // Open the PPT in a new tab
//       }
//     } catch (error) {
//       console.error("Error generating PPT:", error);
//     }
//   };

//   return (
//     <div>
//       {fullData.output.roadmap.map((item, idx) => {
//         return (
//           <div key={idx}>
//             <h2>Day: {item.day}</h2>
//             <h3>Topic: {item.topics[0].topic}</h3>
//             <h3>Description: {item.topics[0].description}</h3>
//             <h4>Resources:</h4>
//             <p>{item.topics[0].resources[0].resource_type}: 
//               <a href={item.topics[0].resources[0].link} target="_blank" rel="noopener noreferrer">
//                 {item.topics[0].resources[0].link}
//               </a>
//             </p>
//             <p>{item.topics[0].resources[1].channel}: 
//               <a href={item.topics[0].resources[1].link} target="_blank" rel="noopener noreferrer">
//                 {item.topics[0].resources[1].link}
//               </a>
//             </p>
//             <h4>Task:</h4>
//             <p>{item.topics[0].task_format}</p>
            
//             {/* PPT Generate Button */}
//             <button onClick={() => handleGeneratePPT(item.topics[0].topic)}>
//               Generate PPT for {item.topics[0].topic}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default LanguageTopics;
import React, { useState } from "react";
import axios from "axios"; // Import axios for making PPT request

function LanguageTopics({ fullData }) {
  const [pptLink, setPptLink] = useState("");

  const handleGeneratePPT = async (topic) => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate-ppt", { topic });
      setPptLink(response.data.link); // Assuming API returns the link
    } catch (error) {
      console.error("Error generating PPT:", error);
    }
  };

  return (
    <>
      <div>
        {fullData.output.roadmap.map((item, idx) => {
          return (
            <div key={idx}>
              <h2>Day: {item.day}</h2>
              <h3>Topic: {item.topics[0].topic}</h3>
              <h3>Description: </h3>
              {item.topics[0].description}
              <h4>Resources</h4>
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
              <h4>Task</h4>
              <p>{item.topics[0].task_format}</p>

              {/* Button to generate PPT */}
              <button onClick={() => handleGeneratePPT(item.topics[0].topic)}>
                Generate PPT
              </button>

              {/* Show link to download the PPT if generated */}
              {pptLink && (
                <div>
                  <h5>PPT Generated:</h5>
                  <a href={pptLink} download>
                    Download PPT
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default LanguageTopics;
