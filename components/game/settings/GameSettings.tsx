import GameTypeSettings from './GameTypeSettings'
import LengthSettings from './LengthSettings'
import OperationSettings from './OperationSettings'

const GameSettings = () => {
  return (
    <section className='flex gap-4'>
      <GameTypeSettings />
      <LengthSettings />
      <OperationSettings />
    </section>
  )
}

export default GameSettings