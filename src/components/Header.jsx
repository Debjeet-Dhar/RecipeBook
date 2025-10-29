'use client'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
export default function headers() {
  return (
    <div className="header sticky top-0 w-full bg-gray-100 text-black">
      <div className="py-6 px-5 flex items-center justify-between">
        <div className="logo">
          <h1 className='text-3xl font-bold'>Recipe<span className='bg-orange-300 bg-clip-text text-transparent'>Book</span></h1>
        </div>
        <div className="profilepic">
              <Link href={'/Bookmark'}><Bookmark/></Link>
        </div>
      </div>
    </div>
  )
}
