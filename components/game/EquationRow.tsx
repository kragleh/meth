"use client"
import { useGame } from '../providers/GameProvider'
import { equationToString } from '@/lib/Equation'
import EquationInput from './EquationInput'
import InputCharacter from './InputCharacter'
import { AnimatePresence, motion } from 'motion/react'

const EquationRow = () => {
  const game = useGame()

  if (!game.currentEquation) return <div className='h-80'></div>

  const fullText = `${equationToString(game.currentEquation)} = `

  return (
    <div className='text-9xl font-bold flex gap-1 whitespace-pre select-none h-80 items-center justify-center'>
      <AnimatePresence mode="wait">
        <motion.div
          key={game.currentEquation.id}
          className="flex"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {fullText.split('').map((ch, i) => (
            <InputCharacter
              key={`${game.currentEquation?.id}-char-${i}`}
              character={ch}
              index={i}
              input={false}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <EquationInput />
    </div>
  )
}

export default EquationRow