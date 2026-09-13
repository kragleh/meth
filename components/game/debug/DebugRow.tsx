import { useGame } from '@/components/providers/GameProvider'

const DebugRow = () => {
  const { currentEquation } = useGame()

  return (
    <p className='text-sm text-neutral-400'>
      {/* Result: { currentEquation?.targetResult } */}
    </p>
  )
}

export default DebugRow