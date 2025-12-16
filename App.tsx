import React, { useState } from "react";
import WorkflowBuilder from "./pages/WorkflowBuilder";

function App() {
  const [currentView, setCurrentView] = useState<"workflow">("workflow");

  return (
    <div className="h-screen w-screen overflow-hidden">
      <WorkflowBuilder />
    </div>
  );
}

export default App;