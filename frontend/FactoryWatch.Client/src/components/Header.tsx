import { FcFactory } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center justify-between w-full px-4">
      <div className="ml-4">
        <Link to="/" className="flex items-center gap-3 ">
          <h1 className="text-white text-2xl font-bold">FactoryWatch</h1>
          <FcFactory size={30} />
        </Link>
      </div>

      <div className="flex items-center gap-3 text-white ">
        <p>Hello, Guest!</p>
        <CgProfile size={30} className="hidden md:block"/>
      </div>
      
      {/* Hamburger Menu - Only visible on mobile */}
      <button className="md:hidden flex flex-col gap-1 p-2">
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>
    </div>
  )
}

export default Header