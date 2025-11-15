import { Link, useLocation } from 'react-router-dom'
import { type IconType } from 'react-icons'

interface NavLinkProps {
  to: string
  icon: IconType
  label: string
  iconSize?: number
}

function NavLink({ to, icon: Icon, label, iconSize = 20 }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to || (to === '/' && location.pathname === '/dashboard')
  
  return (
    <li>
      <Link 
        to={to}
        className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
          isActive 
            ? 'bg-gray-600 text-white' 
            : 'hover:bg-gray-700'
        }`}
      >
        <Icon size={iconSize} />
        <span>{label}</span>
      </Link>
    </li>
  )
}

export default NavLink