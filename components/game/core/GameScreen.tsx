"use client"
import DebugRow from '../debug/DebugRow'
import EquationRow from './EquationRow'
import GameSettings from '../settings/GameSettings'

const GameScreen = () => {
  return (
    <section className='grid grid-cols-1 grid-rows-[1fr_auto_1fr] w-full'>
      <GameSettings />
      <EquationRow />
      <DebugRow />
    </section>
  )
}

export default GameScreen