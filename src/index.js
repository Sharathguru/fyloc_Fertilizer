import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FertilizerDataProvider } from "./FertilizerDataContext";

window.addEventListener('error', e => {
  if (e.message.includes('ResizeObserver')) {
    e.stopImmediatePropagation();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <FertilizerDataProvider>
      <App />
    </FertilizerDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);