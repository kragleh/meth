import GameTypeSettings from './GameTypeSettings'
import LengthSettings from './LengthSettings'
import OperationSettings from './OperationSettings'

const GameSettings = () => {
  return (
    <section className='flex flex-col lg:flex-row items-center justify-center gap-4 m-4 h-fit'>
      <GameTypeSettings />
      <LengthSettings />
      <OperationSettings />
    </section>
  )
}

export default GameSettings