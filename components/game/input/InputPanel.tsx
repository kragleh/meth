"use client"
import { Keyboard } from 'lucide-react'
import InputButton from './InputButton'
import { useFocus } from '@/components/providers/FocusProvider'
import { useInputPanel } from '@/components/providers/InputPanelProvider'

const InputPanel = () => {
  const { opened, setOpened } = useInputPanel()
  const { setHasFocus } = useFocus()

  const toggleOpened = () => {
    const nextOpened = !opened
    setOpened(nextOpened)
    setHasFocus(nextOpened)
  }

  return (
    <>
      <button onClick={ toggleOpened } className='fixed bottom-4 right-4 p-4 rounded-full bg-neutral-800'>
        <Keyboard size={16} />
      </button>

      {
        opened && (
          <section className='bg-neutral-950 p-2 rounded-t-2xl grid gap-1 grid-cols-4 grid-rows-4 z-10'>
            <InputButton action='1' />
            <InputButton action='2' />
            <InputButton action='3' />
            <InputButton action='-' secondary />
            <InputButton action='4' />
            <InputButton action='5' />
            <InputButton action='6' />
            <InputButton action=' ' secondary />
            <InputButton action='7' />
            <InputButton action='8' />
            <InputButton action='9' />
            <InputButton action='delete' secondary />
            <InputButton action=',' />
            <InputButton action='0' />
            <InputButton action='.' />
            <InputButton action='enter' secondary />
          </section>
        )
      }
    </>
  )
}

export default InputPanel