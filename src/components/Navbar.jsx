import React from 'react'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-20 border-b border-white/60 bg-slate-950/75 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl'>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="logo flex items-center gap-3">
            <span className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-black text-white shadow-lg shadow-violet-500/30'>TF</span>
            <div className="leading-tight">
              <span className='block text-lg font-semibold tracking-wide'>TaskFlow</span>
              <span className='text-xs text-slate-300'>Focus. Organize. Finish.</span>
            </div>
        </div>
        <ul className="flex items-center gap-2 text-sm font-medium text-slate-200 sm:gap-3">
            <li className='rounded-full px-4 py-2 transition duration-200 hover:bg-white/10 hover:text-white'>Home</li>
            <li className='rounded-full px-4 py-2 transition duration-200 hover:bg-white/10 hover:text-white'>Your Tasks</li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
