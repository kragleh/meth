import React from 'react'
import Menubar, { MenubarItem } from '../ui/Menubar'
import { useGame } from '../providers/GameProvider'
import { Clock, Mountain } from 'lucide-react'
import { GameType } from '@/lib/GameType'

const GameTypeSettings = () => {
  const { gameType, setGameType } = useGame()

  return (
    <Menubar>
      {/* <MenubarItem className={ gameType === GameType.TIMED ? 'bg-neutral-700' : '' } onClick={ () => setGameType(GameType.TIMED) }> */}
      <MenubarItem className='hover:bg-transparent cursor-not-allowed'>
        <Clock size={16} /> Time
      </MenubarItem>
      <MenubarItem className={ gameType === GameType.ZEN ? 'bg-neutral-700' : '' } onClick={ () => setGameType(GameType.ZEN) }>
        <Mountain size={16} /> Zen
      </MenubarItem>
    </Menubar>
  )
}

export default GameTypeSettings