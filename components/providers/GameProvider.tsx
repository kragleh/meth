"use client"
import { Equation, generateEquation } from "@/lib/Equation";
import { GameType } from "@/lib/GameType";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export interface GameSettings {
  length: number;
  randomLength: boolean;
  operations: string[];
}

interface GameContextType {
  gameType: GameType;
  setGameType: Dispatch<SetStateAction<GameType>>;
  currentEquation: Equation | undefined;
  setCurrentEquation: Dispatch<SetStateAction<Equation | undefined>>;
  currentInput: string[];
  setCurrentInput: Dispatch<SetStateAction<string[]>>;
  settings: GameSettings;
  setSettings: Dispatch<SetStateAction<GameSettings>>;
  updateSettings: (partial: Partial<GameSettings>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameType, setGameType] = useState<GameType>(GameType.ZEN)
  const [currentEquation, setCurrentEquation] = useState<Equation | undefined>(undefined)
  const [currentInput, setCurrentInput] = useState<string[]>([])

  const [settings, setSettings] = useState<GameSettings>({
    length: 3,
    randomLength: true,
    operations: ['+', '-', '/', '*'],
  })

  const updateSettings = (partial: Partial<GameSettings>) => {
    setSettings((prev) => {
      const nextSettings = { ...prev, ...partial }

      setCurrentEquation(generateEquation(nextSettings.length, nextSettings.operations, nextSettings.randomLength))
      return nextSettings
    })
  }

  useEffect(() => {
    setCurrentEquation(generateEquation(settings.length, settings.operations, settings.randomLength))
  }, [])

  return (
    <GameContext.Provider 
      value={{
        gameType, setGameType, 
        currentEquation, setCurrentEquation,
        currentInput, setCurrentInput,
        settings, setSettings, updateSettings,
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