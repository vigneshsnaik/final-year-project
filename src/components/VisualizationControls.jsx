import React from "react";

function VisualizationControls({
  onVisualize,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
}) {
  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={onVisualize}>Visualize</button>
      <button onClick={onPrevious} disabled={currentStep === 0}>
        Previous
      </button>
      <button onClick={onNext} disabled={currentStep >= totalSteps - 1}>
        Next
      </button>
    </div>
  );
}

export default VisualizationControls;
