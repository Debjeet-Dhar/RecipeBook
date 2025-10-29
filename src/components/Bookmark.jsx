'use client'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function Bookmark() {
  return (
    <div className='Bookmark px-6 py-10'>
      <div className="back flex items-center">
        <ArrowLeft/>
        <h2 className='mx-38 text-sm'>Saved Recipe</h2>
      </div>
      <div className="feed">

      </div>
    </div>
  )
}
