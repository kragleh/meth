import { useFocus } from '@/components/providers/FocusProvider'
import { useInputPanel } from '@/components/providers/InputPanelProvider'
import { ArrowRight, Delete, Space } from 'lucide-react'
import React, { ReactNode } from 'react'

const InputButton = ({ action, secondary }: { action: string, secondary?: boolean }) => {
  const { setOpened } = useInputPanel()
  const { setHasFocus } = useFocus()
  let onClick = () => { simulateKeypress(action) }
  let label: ReactNode

  if (action === ' ') {
    label = (<Space size={16} />)
  } else if (action === 'delete') {
    label = (<Delete size={16} />)
  } else if (action === 'enter') {
    label = (<ArrowRight size={16} />)
    onClick = () => {
      setOpened(false)
      setHasFocus(false)
    }
  } else {
    label = action
  }

  return (
    <button onClick={ onClick } className={'px-4 py-2 rounded-full w-full flex items-center justify-center ' + (secondary ? 'bg-neutral-800' : 'bg-neutral-900')}>
      { label }
    </button>
  )
}

const simulateKeypress = (key: string) => {
  // Map actions to standard KeyboardEvent key values if needed
  const keyMap: Record<string, string> = {
    enter: 'Enter',
    delete: 'Backspace',
    ' ': ' ',
  }

  const resolvedKey = keyMap[key] ?? key

  const eventInit: KeyboardEventInit = {
    key: resolvedKey,
    code: resolvedKey.length === 1 ? `Key${resolvedKey.toUpperCase()}` : resolvedKey,
    bubbles: true,
    cancelable: true,
  }

  // Dispatch to the element currently in focus, or fallback to window
  const target = document.activeElement ?? window
  target.dispatchEvent(new KeyboardEvent('keydown', eventInit))
  target.dispatchEvent(new KeyboardEvent('keyup', eventInit))
}

export default InputButton