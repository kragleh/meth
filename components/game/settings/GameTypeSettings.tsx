import Menubar, { MenubarItem } from '../../ui/Menubar'
import { useGame } from '../../providers/GameProvider'
import { Clock, Mountain } from 'lucide-react'
import { GameType } from '@/lib/GameType'

const GameTypeSettings = () => {
  const { gameType, setGameType } = useGame()

  return (
    <Menubar>
      <MenubarItem disabled={ true } checked={ gameType === GameType.TIMED } onClick={ () => setGameType(GameType.ZEN) } >
        <Clock size={16} /> Time
      </MenubarItem>
      <MenubarItem checked={ gameType === GameType.ZEN } onClick={ () => setGameType(GameType.ZEN) }>
        <Mountain size={16} /> Zen
      </MenubarItem>
    </Menubar>
  )
}

export default GameTypeSettings