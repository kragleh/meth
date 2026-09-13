import Link from 'next/link'

const Footer = () => {
  return (
    <div className='text-center p-2 w-full'>
      <Link href='https://kragleh.com' className='p-2 text-sm text-neutral-400'>
        2026 © kragleh.com
      </Link>
    </div>
  )
}

export default Footer