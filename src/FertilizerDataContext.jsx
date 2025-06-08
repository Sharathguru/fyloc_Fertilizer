import React, { createContext, useContext } from "react";
import { data } from "./result.js";

const FertilizerData = createContext();

export function FertilizerDataProvider({ children }) {
  return (
    <FertilizerData.Provider value={data}>
      {children}
    </FertilizerData.Provider>
  );
}

export function useFertilizerData() {
  return useContext(FertilizerData);
}