import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { MdClose } from 'react-icons/md'
import { CgProfile } from "react-icons/cg"
import { navItems } from '../config/navigation'
import NavLink from './NavLink';

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()
  const prevPathname = useRef(location.pathname)

  // Close menu when route changes (but not on initial mount)
  useEffect(() => {
    if (prevPathname.current !== location.pathname && isOpen) {
      onClose()
    }
    prevPathname.current = location.pathname
  }, [location.pathname, isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop/Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Mobile Menu Drawer */}
      <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-white text-lg font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2"
            aria-label="Close menu"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-600 text-white">
          <CgProfile size={30} />
          <p>Hello, Guest!</p>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2 text-white">
            {navItems.map((item) => (
              <NavLink 
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                iconSize={item.iconSize}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu