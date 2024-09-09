import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import FetchLearning from "./components/FetchLearning";
import LanguageTopics from "./components/LanguageTopics";

const App = () => {
  const [fullData, setFullData] = useState(null); // Shared state for fetched data

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page with FetchLearning component */}
          <Route path="/" element={<FetchLearning setFullData={setFullData} />} />

          {/* LanguageTopics page, only accessible after fetching data */}
          <Route path="/topics" element={<LanguageTopics fullData={fullData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
