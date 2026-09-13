import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='absolute left-0 bottom-0 text-center p-2 w-full'>
      <Link href='https://kragleh.com' className='p-2 text-sm text-neutral-400'>
        2026 © kragleh.com
      </Link>
    </div>
  )
}

export default Footer