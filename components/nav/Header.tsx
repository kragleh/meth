import Link from 'next/link'
import Logo from '../ui/Logo'

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={ 'w-full mx-auto flex items-center justify-between p-4 ' + className }>
      <Link href={'/'}>
        <Logo className='w-12 h-12 fill-primary stroke-primary' />
      </Link>
      <p className='text-neutral-400'>{ process.env.NEXT_PUBLIC_APP_VERSION }</p>
    </header>
  )
}

export default Header