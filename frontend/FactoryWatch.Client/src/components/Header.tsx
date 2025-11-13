import { FcFactory } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full px-4">
        <div className="ml-4 flex items-center gap-3">
          <Link to="/" className="flex gap-1">
            <h1 className="text-white text-2xl font-bold pt-1">FactoryWatch</h1>
            <FcFactory className="pb-0" size={32} />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 text-white">
          <p>Hello, Guest!</p>
          <CgProfile size={30} className=""/>
        </div>
        
        {/* Hamburger Menu - Only visible on mobile */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden flex flex-col justify-center gap-1 p-2"
          aria-label="Open menu"
        >
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}

export default Header