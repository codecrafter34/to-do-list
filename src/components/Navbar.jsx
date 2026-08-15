import React from 'react'

const Navbar = () => {
  return (
    <nav
      style={{
        background: 'rgba(15, 15, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
      className="w-full h-16 flex items-center justify-between px-6 md:px-12"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base font-black"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
        >
          ✓
        </div>
        <div>
          <span
            className="font-black text-base tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            iTask
          </span>
          <span
            className="text-xs font-medium ml-1.5 hidden sm:inline"
            style={{ color: 'rgba(167, 139, 250, 0.45)' }}
          >
            Get things done.
          </span>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-1 sm:gap-2">
        <a
          href="#"
          className="px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300"
          style={{
            color: 'rgba(167, 139, 250, 0.7)',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.color = '#c4b5fd'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'
            e.currentTarget.style.color = 'rgba(167, 139, 250, 0.7)'
          }}
        >
          Home
        </a>
        <a
          href="#"
          className="px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300"
          style={{
            color: 'white',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          My Tasks
        </a>
      </div>
    </nav>
  )
}

export default Navbar
