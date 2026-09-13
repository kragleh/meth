"use client"
import { useEffect } from "react"
import { useGame } from "../providers/GameProvider"
import { generateEquation } from "@/lib/Equation"
import InputCharacter from "./InputCharacter"
import { AnimatePresence } from "motion/react"
import { randomInt } from "@/lib/Random"

const EquationInput = () => {
  const { 
    currentEquation, 
    currentInput, 
    setCurrentInput, 
    setCurrentEquation, 
    currentLength, 
    randomLength,
    enabledOperations
  } = useGame()

  useEffect(() => {
    if (!currentEquation) return

    const targetDigits = currentEquation.targetResult.toString().split("")

    const handleKeyDown = (event: KeyboardEvent) => {
      // easy validation (no invalid)
      if (false) {
        if (event.key === "Backspace") {
          setCurrentInput((prev) => prev.slice(0, -1))
          return
        }

        if (event.key === " ") {
          setTimeout(() => {
            setCurrentInput([])
            newEquation()
          }, 150)
          return
        }

        if (!/^[0-9-]$/.test(event.key)) return 

        const currentDigitIndex = currentInput.length
        const expectedDigit = targetDigits[currentDigitIndex]

        if (event.key === expectedDigit) {
          const nextInput = [...currentInput, event.key]
          setCurrentInput(nextInput)

          if (nextInput.length === targetDigits.length) {
            setTimeout(() => {
              setCurrentInput([])
              newEquation()
            }, 150)
          }
        }

        return
      }

      if (event.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1))
        return
      }

      if (event.key === " ") {
        setTimeout(() => {
          setCurrentInput([])
          newEquation()
        }, 150)
        return
      }

      if (currentInput.length > 5) return

      // Fix for decimal points!!!
      if (!/^[0-9.-]$/.test(event.key)) return

      const nextInput = [...currentInput, event.key]
      setCurrentInput(nextInput)

      if (nextInput.length === targetDigits.length && nextInput.every((val, index) => val === targetDigits[index])) {
        setTimeout(() => {
          setCurrentInput([])
          newEquation()
        }, 150)
      }
    }

    const newEquation = () => {
      if (randomLength) {
        setCurrentEquation(generateEquation(randomInt(1, currentLength), enabledOperations))
      } else {
        setCurrentEquation(generateEquation(currentLength, enabledOperations))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentEquation, currentInput, setCurrentInput, setCurrentEquation, currentLength, randomLength, enabledOperations])

  if (!currentEquation) return null

  const baseIndex = 1 + currentEquation.terms.length * 4

  return (
    <div className="flex">
      {/* <AnimatePresence mode="popLayout"> */}
        {currentInput.map((digit, index) => (
          <InputCharacter
            key={`input-${index}`}
            character={digit}
            index={baseIndex + index}
            input={true}
          />
        ))}
      {/* </AnimatePresence> */}
    </div>
  )
}

export default EquationInput