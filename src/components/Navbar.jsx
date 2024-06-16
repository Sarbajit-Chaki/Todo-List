// eslint-disable-next-line no-unused-vars
import React from 'react'

const Navbar = () => {
  return (
    <nav className=' text-white flex gap-5  px-5 py-3 bg-[#825ed7] justify-between'>
        <div className="logo ">
            <span className=' font-bold text-xl'>iTodo</span>
        </div>

        <ul className=' flex gap-5 text-lg '>
            <li className=' cursor-pointer hover:font-bold'>Home</li>
            <li className=' cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
