import GameScreen from '@/components/game/GameScreen'
import Footer from '@/components/nav/Footer'
import { GameProvider } from '@/components/providers/GameProvider'

const HomePage = () => {
  return (
    <GameProvider>
      <GameScreen />
      <Footer />
    </GameProvider>
  )
}

export default HomePage