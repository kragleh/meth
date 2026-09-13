import { useGame } from '../../providers/GameProvider'
import Menubar, { MenubarItem } from '../../ui/Menubar'

const OperationSettings = () => {
  const { settings, updateSettings } = useGame()

  const operations = ['+', '-', '/', '*']

  const toggleOperation = (op: string) => {
    const currentOps = settings.operations

    if (currentOps.includes(op)) {
      if (currentOps.length === 1) return
      
      updateSettings({
        operations: currentOps.filter((item) => item !== op),
      })
    } else {
      updateSettings({
        operations: [...currentOps, op],
      })
    }
  }

  return (
    <Menubar>
      {operations.map((op) => {
        const isActive = settings.operations.includes(op)

        return (
          <MenubarItem
            key={op}
            checked={ isActive }
            onClick={() => toggleOperation(op)}
          >
            {op}
          </MenubarItem>
        )
      })}
    </Menubar>
  )
}

export default OperationSettings