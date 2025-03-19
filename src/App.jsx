import React, { useState, useCallback } from "react";
import axios from "axios";
import CodeEditor from "./components/CodeEditor";
import VisualizationControls from "./components/VisualizationControls";
import ExecutionStep from "./components/ExecutionStep";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const CLIENT_ID = import.meta.env.VITE_APP_OAUTH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET;

function App() {
  const [value, setValue] = useState("");
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState(null);

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  const visualizeCode = () => {
    axios
      .post(`${API_BASE_URL}/api/trace-python`, {
        code: value,
        apiKey: `${API_KEY}`,
        clientID: `${CLIENT_ID}`,
        secret: `${CLIENT_SECRET}`,
      })
      .then((response) => {
        setResponse(response);
        setExecutionSteps(response.data.steps);
        setCurrentStep(0);
      })
      .catch((error) => {
        console.error("Error visualizing code:", error);
      });
  };

  const nextStep = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <CodeEditor value={value} onChange={onChange} />
      <VisualizationControls
        onVisualize={visualizeCode}
        onNext={nextStep}
        onPrevious={previousStep}
        currentStep={currentStep}
        totalSteps={executionSteps.length}
      />
      <ExecutionStep
        step={executionSteps[currentStep]}
        currentStep={currentStep}
      />
    </div>
  );
}

export default App;
