'use client'
import React from 'react'

export default function Profile() {
  return (
    <div className="profile">
        <h2 className='text-lg mt-6 text-center'>Profile</h2>
      <div className="px-6 py-8">
        <div className="flex flex-col space-y-8 items-center justify-center">
          <div className="profileImg">
            <div className="w-30 h-30 rounded-full bg-gray-300"></div>
          </div>
          <div className="Userdata text-center">
            <h1 className='text-xl font-semibold'>UserName</h1>
            <h1 className='text-xl font-semibold mt-3'>Email</h1>
          </div>
          <div className="Update flex space-x-6">
            <div className="btn bg-gradient-to-tr from-indigo-500 to-purple-400 text-white text-lg font-semibold py-3 rounded-lg px-6 ">Edit</div>
            <div className="btn bg-gradient-to-tr from-indigo-500 text-white to-purple-400 py-3 rounded-lg px-6 text-lg font-semibold ">LogOut</div>
          </div>

        </div>
      </div>
    </div>
  )
}
