import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
        <nav>
            <ul>
                <li><Link to="/overview">Overview</Link></li>
                <li><Link to="/equipment">Equipment</Link></li>
                <li><Link to="/work-orders">Work Orders</Link></li>
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar;
