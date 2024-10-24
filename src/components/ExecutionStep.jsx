import React from "react";

function ExecutionStep({ step, currentStep }) {
  return (
    <div>
      <h3>Execution Step {currentStep + 1}:</h3>
      <pre>{step || "No steps available"}</pre>
    </div>
  );
}

export default ExecutionStep;
