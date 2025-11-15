import { MdDashboard } from 'react-icons/md'
import { BsClipboardCheck } from 'react-icons/bs'
import { TbForklift } from "react-icons/tb"
import { MdOutlineFactory } from "react-icons/md"
import { FaHardHat } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import NavLink from './NavLink'

const navItems = [
  { to: '/', icon: MdDashboard, label: 'Dashboard', iconSize: 20 },
  { to: '/equipment', icon: TbForklift, label: 'Equipment', iconSize: 25 },
  { to: '/work-orders', icon: BsClipboardCheck, label: 'Work Orders', iconSize: 20 },
  { to: '/locations', icon: MdOutlineFactory, label: 'Locations', iconSize: 20 },
  { to: '/technicians', icon: FaHardHat, label: 'Technicians', iconSize: 20 },
  { to: '/settings', icon: FaGear, label: 'Settings', iconSize: 20 },
]

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