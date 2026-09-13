"use client"
import { useGame } from '../../providers/GameProvider'
import { equationToString } from '@/lib/Equation'
import EquationInput from './EquationInput'
import InputCharacter from './InputCharacter'
import { AnimatePresence, motion } from 'motion/react'

const EquationRow = () => {
  const {
    currentEquation,
    hasFocus
  } = useGame()

  if (!currentEquation) return <div className='h-80'></div>

  const fullText = `${equationToString(currentEquation)} = `

  return (
    <div className={'text-[clamp(1.5rem,5vw,6rem)] font-bold flex gap-1 whitespace-pre select-none items-center justify-center duration-200 ' + (hasFocus ? '' : 'blur-2xl')}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEquation.id}
          className="flex"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {fullText.split('').map((ch, i) => (
            <InputCharacter
              key={`${currentEquation?.id}-char-${i}`}
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