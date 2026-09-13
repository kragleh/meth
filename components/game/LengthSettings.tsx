import Menubar, { MenubarItem } from '../ui/Menubar'
import { useGame } from '../providers/GameProvider'

const LengthSettings = () => {
  const { 
    currentLength, setCurrentLength,
    randomLength, setRandomLength
  } = useGame()

  return (
    <Menubar>
      <MenubarItem className={ randomLength == true ? 'bg-neutral-700' : '' } onClick={ () => setRandomLength(!randomLength) }>
        Random Length
      </MenubarItem>
      <MenubarItem className={ currentLength === 1 ? 'bg-neutral-700' : '' } onClick={ () => setCurrentLength(1) }>
        1
      </MenubarItem>
      <MenubarItem className={ currentLength === 2 ? 'bg-neutral-700' : '' } onClick={ () => setCurrentLength(2) }>
        2
      </MenubarItem>
      <MenubarItem className={ currentLength === 3 ? 'bg-neutral-700' : '' } onClick={ () => setCurrentLength(3) }>
        3
      </MenubarItem>
    </Menubar>
  )
}

export default LengthSettings