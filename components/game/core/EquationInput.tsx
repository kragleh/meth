"use client"
import { useEffect, useRef } from "react"
import { useGame } from "../../providers/GameProvider"
import { generateEquation } from "@/lib/Equation"
import InputCharacter from "./InputCharacter"
import { useInput } from "@/components/providers/InputProvider"
import { useFocus } from "@/components/providers/FocusProvider"

const EquationInput = () => {
  const { currentInput, setCurrentInput } = useInput()
  const { hasFocus, setHasFocus } = useFocus()
  const { 
    currentEquation,
    setCurrentEquation,
    settings
  } = useGame()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setHasFocus(true)

      if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1))
        return
      }

      if (e.key === " ") {
        e.preventDefault()
        setTimeout(() => {
          setCurrentInput([])
          newEquation()
        }, 150)
        return
      }

      const char = e.key

      if (currentInput.length > 5) return
      if (!/^[0-9.,-]$/.test(char)) return

      const nextInput = [...currentInput, char]
      setCurrentInput(nextInput)

      if (
        nextInput.length === targetDigits.length && 
        nextInput.every((val, index) => {
          const normalizedVal = val === ',' ? '.' : val
          const normalizedTarget = targetDigits[index] === ',' ? '.' : targetDigits[index]
          return normalizedVal === normalizedTarget
        })
      ) {
        setTimeout(() => {
          setCurrentInput([])
          newEquation()
        }, 150)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentInput])

  if (!currentEquation) return null

  const targetDigits = currentEquation.targetResult.toString().split("")
  const baseIndex = 1 + currentEquation.terms.length * 4

  const newEquation = () => {
    setCurrentEquation(generateEquation(settings.length, settings.operations, settings.randomLength))
  }

  return (
    <div className="relative flex min-w-[3ch] min-h-[1em] items-center">
      {
        currentInput.map((digit, index) => (
          <InputCharacter
            key={`input-${index}`}
            character={digit}
            index={baseIndex + index}
            input={true}
          />
        ))
      }
    </div>
  )
}

export default EquationInput