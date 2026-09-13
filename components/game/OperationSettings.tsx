import { useGame } from '../providers/GameProvider'
import Menubar, { MenubarItem } from '../ui/Menubar'

const OperationSettings = () => {
  const { enabledOperations, setEnabledOperations } = useGame()

  const operations = ['+', '-', '/', '*']

  const toggleOperation = (op: string) => {
    if (enabledOperations.includes(op)) {
      // Prevent removing the last operation if at least one must remain active
      if (enabledOperations.length === 1) return
      setEnabledOperations(enabledOperations.filter((item) => item !== op))
    } else {
      setEnabledOperations([...enabledOperations, op])
    }
  }

  return (
    <Menubar>
      {
        operations.map((op) => {
          const isActive = enabledOperations.includes(op)

          return (
            <MenubarItem
              key={op}
              className={isActive ? 'bg-neutral-700' : ''}
              onClick={() => toggleOperation(op)}
            >
              {op}
            </MenubarItem>
          )
        })
      }
    </Menubar>
  )
}

export default OperationSettings