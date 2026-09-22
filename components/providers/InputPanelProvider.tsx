"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface InputPanelContextType {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const InputPanelContext = createContext<InputPanelContextType | undefined>(undefined);

export const InputPanelProvider = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <InputPanelContext.Provider
      value={{
        opened, setOpened
      }}
    >
      { children }
    </InputPanelContext.Provider>
  )
}

export const useInputPanel = (): InputPanelContextType => {
  const context = useContext(InputPanelContext);

  if (!context) {
    throw new Error("useInputPanel must be used within an InputPanelProvider");
  }

  return context;
}