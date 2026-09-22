"use client"
import { useGame } from '../../providers/GameProvider'
import { equationToString } from '@/lib/Equation'
import EquationInput from './EquationInput'
import InputCharacter from './InputCharacter'
import { AnimatePresence, motion } from 'motion/react'
import { useFocus } from '@/components/providers/FocusProvider'

const EquationRow = () => {
  const { hasFocus, setHasFocus } = useFocus()
  const { currentEquation } = useGame()

  if (!currentEquation) return <div className='h-80' />

  const fullText = `${equationToString(currentEquation)} = `

  return (
    <div
      tabIndex={0}
      onClick={() => setHasFocus(true)}
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
          return
        }
        setHasFocus(false)
      }}
      className="relative cursor-pointer text-[clamp(1.5rem,5vw,6rem)] font-bold flex items-center justify-center select-none outline-none"
    >
      <div
        className={`flex items-center justify-center gap-1 whitespace-pre transition-[filter] duration-200 ${
          hasFocus ? '' : 'blur-[clamp(4px,16px,40px)] pointer-events-none'
        }`}
      >
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
                key={`${currentEquation.id}-char-${i}`}
                character={ch}
                index={i}
                input={false}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <EquationInput />
      </div>

      <AnimatePresence>
        {!hasFocus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center whitespace-pre"
          >
            {"Click here to resume ...".split('').map((c, i) => (
              <InputCharacter
                key={i}
                character={c}
                index={i}
                input={false}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EquationRow