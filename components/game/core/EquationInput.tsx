"use client"
import { useEffect, useRef } from "react"
import { useGame } from "../../providers/GameProvider"
import { generateEquation } from "@/lib/Equation"
import InputCharacter from "./InputCharacter"

const EquationInput = () => {
  const { 
    currentEquation, 
    currentInput, 
    setCurrentInput, 
    setCurrentEquation,
    settings,
    hasFocus,
    setHasFocus
  } = useGame()

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasFocus) {
      hiddenInputRef.current?.focus()
    } else {
      hiddenInputRef.current?.blur()
    }
  }, [hasFocus])

  if (!currentEquation) return null

  const targetDigits = currentEquation.targetResult.toString().split("")
  const baseIndex = 1 + currentEquation.terms.length * 4

  const newEquation = () => {
    setCurrentEquation(generateEquation(settings.length, settings.operations, settings.randomLength))
  }

  const processInput = (char: string) => {
    if (currentInput.length > 5) return
    if (!/^[0-9.-]$/.test(char)) return

    const nextInput = [...currentInput, char]
    setCurrentInput(nextInput)

    if (
      nextInput.length === targetDigits.length && 
      nextInput.every((val, index) => val === targetDigits[index])
    ) {
      setTimeout(() => {
        setCurrentInput([])
        newEquation()
      }, 150)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    e.target.value = ""

    if (!val) return
    const char = val.slice(-1)
    processInput(char)
  }

  return (
    <div 
      className="relative flex min-w-[3ch] min-h-[1em] cursor-text items-center"
      onClick={() => {
        hiddenInputRef.current?.focus()
        setHasFocus(true)
      }}
    >
      <input
        ref={hiddenInputRef}
        type="text"
        inputMode="decimal"
        pattern="[0-9]*"
        className="absolute inset-0 opacity-0 w-full h-full z-10 cursor-pointer"
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      {currentInput.map((digit, index) => (
        <InputCharacter
          key={`input-${index}`}
          character={digit}
          index={baseIndex + index}
          input={true}
        />
      ))}
    </div>
  )
}

export default EquationInput