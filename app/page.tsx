import GameScreen from '@/components/game/core/GameScreen'
import InputPanel from '@/components/game/input/InputPanel'
import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import { FocusProvider } from '@/components/providers/FocusProvider'
import { GameProvider } from '@/components/providers/GameProvider'
import { InputPanelProvider } from '@/components/providers/InputPanelProvider'
import { InputProvider } from '@/components/providers/InputProvider'

const HomePage = () => {
  return (
    <FocusProvider>
      <GameProvider>
        <InputProvider>
            <InputPanelProvider>
              <main className='h-dvh w-full container mx-auto grid grid-cols-1 grid-rows-[auto_1fr_auto]'>
                <Header />
                <GameScreen />
                <Footer />
                <InputPanel />
              </main>
            </InputPanelProvider>
        </InputProvider>
      </GameProvider>
    </FocusProvider>
  )
}

export default HomePage