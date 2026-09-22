"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface InputContextType {
  currentInput: string[];
  setCurrentInput: Dispatch<SetStateAction<string[]>>;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  
  return (
    <InputContext.Provider
      value={{
        currentInput, setCurrentInput
      }}
    >
      { children }
    </InputContext.Provider>
  )
}

export const useInput = (): InputContextType => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error("useInput must be used within an InputProvider");
  }

  return context;
}
