import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { BsClipboardCheck } from 'react-icons/bs'
import { TbForklift } from "react-icons/tb";

function Sidebar() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <aside className="h-full">
      <nav className="p-4">
        <ul className="space-y-2 text-white">
          <li>
            <Link 
              to="/"
              className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
                isActive('/dashboard') || isActive('/') 
                  ? 'bg-gray-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <MdDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/equipment"
              className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
                isActive('/equipment') 
                  ? 'bg-gray-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <TbForklift size={25} />
              <span>Equipment</span>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/work-orders"
              className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors ${
                isActive('/work-orders') 
                  ? 'bg-gray-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <BsClipboardCheck size={20} />
              <span>Work Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar