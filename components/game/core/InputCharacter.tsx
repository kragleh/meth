"use client"
import { randomInt } from '@/lib/Random'
import { motion } from 'motion/react'

interface InputCharacterProps {
  character: string
  index: number
  input: boolean
}

const InputCharacter = ({ character, index = 0, input = false }: InputCharacterProps) => {
  const initial = randomInt(-24, 24)
  const exit = -initial
  const staggerDelay = input ? 0 : 0.02 * index

  return (
    <motion.span
      layout="position"
      initial={{
        scale: 2,
        opacity: 0,
        rotate: initial,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
      }}
      exit={{
        scale: 0,
        opacity: 0,
        rotate: exit,
        position: "relative"
      }}
      transition={{
        // Entry / exit visual styles retain the staggered delay
        scale: { duration: 0.15, delay: staggerDelay },
        opacity: { duration: 0.15, delay: staggerDelay },
        rotate: { duration: 0.15, delay: staggerDelay },
        // Layout shift happens instantly with zero delay
        layout: { type: "spring", stiffness: 400, damping: 30, delay: 0 },
      }}
      className="inline-block"
    >
      {character}
    </motion.span>
  )
}

export default InputCharacter