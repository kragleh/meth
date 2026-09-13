import { HTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'

const Menubar = ({ children, className = '' }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-menu rounded-full p-1 flex gap-1 select-none ${className}`}>
      {children}
    </div>
  )
}

export const MenubarItem = ({
  children,
  asChild,
  className = '',
  checked = false,
  disabled = false,
  ...props
}: {
  children: ReactNode
  asChild?: boolean
  checked?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      {...props}
      className={`
        ${ disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-menu-hover' }
        ${ checked ? 'text-primary' : 'text-neutral-400' }
        duration-200 
        flex items-center justify-center gap-1 
        first:rounded-l-full last:rounded-r-full 
        px-2 first:pl-3 last:pr-3 py-1 ${className}
      `}
    >
      {children}
    </Comp>
  )
}

export default Menubar