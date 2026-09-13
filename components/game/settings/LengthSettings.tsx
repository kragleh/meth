import Menubar, { MenubarItem } from '../../ui/Menubar'
import { useGame } from '../../providers/GameProvider'

const LengthSettings = () => {
  const { settings, updateSettings } = useGame()

  const lengths = [1, 2, 3]

  return (
    <Menubar>
      <MenubarItem
        checked={ settings.randomLength }
        onClick={() => updateSettings({ randomLength: !settings.randomLength })}
      >
        Random Length
      </MenubarItem>
      {
        lengths.map((len) => (
          <MenubarItem
            key={len}
            checked={ settings.length === len }
            onClick={() => updateSettings({ length: len })}
          >
            {len}
          </MenubarItem>
        ))
      }
    </Menubar>
  )
}

export default LengthSettings