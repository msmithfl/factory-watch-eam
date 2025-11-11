import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
        <nav>
            <ul>
                <li><Link to="/">Overview</Link></li>
                <li><Link to="/equipment">Equipment</Link></li>
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar;
