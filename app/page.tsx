import GameScreen from '@/components/game/core/GameScreen'
import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import { GameProvider } from '@/components/providers/GameProvider'

const HomePage = () => {
  return (
    <GameProvider>
      <main className='h-dvh w-full container mx-auto grid grid-cols-1 grid-rows-[auto_1fr_auto]'>
        <Header />
        <GameScreen />
        <Footer />
      </main>
    </GameProvider>
  )
}

export default HomePage