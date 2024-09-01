import React, { useState } from "react";
import Button from "./components/Button";
import CaseDiv from "./components/CaseDiv";

function App() {
  const [isBtnVis, setIsBtnVis] = useState(true);
  const [isCaseVisible, setIsCaseVisible] = useState(false);

  const disappear = () => {
    setIsBtnVis(false);
    setIsCaseVisible(true);
  };

  return (
    <div className="bg-slate-600 w-full h-screen relative">
      <img
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isBtnVis ? "opacity-5" : "opacity-30"
        }`}
        src="/Court-room.jpg"
        alt="Court room"
      />
      {isBtnVis && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Button onClick={disappear} />
        </div>
      )}
      <div
        className={`absolute inset-0 flex justify-center items-center transition-transform duration-500 ${
          isCaseVisible ? "transform translate-y-0 opacity-100" : "transform -translate-y-full opacity-0"
        }`}
      >
        <CaseDiv />
      </div>
    </div>
  );
}

export default App;
