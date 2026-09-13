"use client"
import { Equation, generateEquation } from "@/lib/Equation";
import { GameType } from "@/lib/GameType";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface GameContextType {
  gameType: GameType;
  setGameType: Dispatch<SetStateAction<GameType>>;
  currentEquation: Equation | undefined;
  setCurrentEquation: Dispatch<SetStateAction<Equation | undefined>>;
  currentInput: string[];
  setCurrentInput: Dispatch<SetStateAction<string[]>>;
  currentLength: number;
  setCurrentLength: Dispatch<SetStateAction<number>>;
  randomLength: boolean;
  setRandomLength: Dispatch<SetStateAction<boolean>>;
  enabledOperations: string[];
  setEnabledOperations: Dispatch<SetStateAction<string[]>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameType, setGameType] = useState<GameType>(GameType.ZEN)
  const [currentEquation, setCurrentEquation] = useState<Equation | undefined>(undefined)
  const [currentInput, setCurrentInput] = useState<string[]>([])
  const [currentLength, setCurrentLength] = useState<number>(3)
  const [randomLength, setRandomLength] = useState<boolean>(true)
  const [enabledOperations, setEnabledOperations] = useState<string[]>(['+', '-', '/', '*'])

  useEffect(() => {
    setCurrentEquation(generateEquation())
  }, [])

  return (
    <GameContext.Provider 
      value={{
        gameType, setGameType, 
        currentEquation, setCurrentEquation,
        currentInput, setCurrentInput,
        currentLength, setCurrentLength,
        randomLength, setRandomLength,
        enabledOperations, setEnabledOperations
      }}
    >
      { children }
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextType => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }

  return context
}