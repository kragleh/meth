"use client"
import { useEffect } from "react"
import { useGame } from "../../providers/GameProvider"
import { generateEquation } from "@/lib/Equation"
import InputCharacter from "./InputCharacter"
import { randomInt } from "@/lib/Random"

const EquationInput = () => {
  const { 
    currentEquation, 
    currentInput, 
    setCurrentInput, 
    setCurrentEquation,
    settings
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
      setCurrentEquation(generateEquation(settings.length, settings.operations, settings.randomLength))
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentEquation, currentInput, setCurrentInput, setCurrentEquation, settings])

  if (!currentEquation) return null

  const baseIndex = 1 + currentEquation.terms.length * 4

  return (
    <div className="flex">
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