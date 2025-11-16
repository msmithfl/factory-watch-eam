import NavLink from './NavLink'
import { navItems } from '../config/navigation'

function Sidebar() {
  return (
    <aside className="h-full">
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
    </aside>
  )
}

export default Sidebar