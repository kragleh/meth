"use client"
import DebugRow from '../debug/DebugRow'
import EquationRow from './EquationRow'
import GameSettings from '../settings/GameSettings'

const GameScreen = () => {
  return (
    <section className='flex flex-col items-center justify-center w-full h-screen'>
      <GameSettings />
      <EquationRow />
      <DebugRow />
    </section>
  )
}

export default GameScreen