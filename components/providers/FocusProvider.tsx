"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface FocusContextType {
  hasFocus: boolean;
  setHasFocus: Dispatch<SetStateAction<boolean>>;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [hasFocus, setHasFocus] = useState<boolean>(true);
  
  return (
    <FocusContext.Provider
      value={{
        hasFocus, setHasFocus
      }}
    >
      { children }
    </FocusContext.Provider>
  )
}

export const useFocus = (): FocusContextType => {
  const context = useContext(FocusContext);

  if (!context) {
    throw new Error("useFocus must be used within a FocusProvider");
  }

  return context;
}