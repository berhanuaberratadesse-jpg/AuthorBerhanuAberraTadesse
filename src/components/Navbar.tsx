import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-amber-500/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="/image.png" 
                alt="Berhanu Aberra Tadesse Logo" 
                className="h-12 w-auto transition-transform hover:scale-105" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition cursor-pointer">Home</Link>
            <Link to="/#book" className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition cursor-pointer">About Book</Link>
            <Link to="/audiobook" className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition cursor-pointer">Audiobook</Link>
            <Link to="/courses" className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition cursor-pointer">Courses</Link>
            <Link to="/blog" className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium transition cursor-pointer">Blog</Link>
            <Link to="/#contact" className="bg-amber-500 text-slate-900 hover:bg-amber-400 px-5 py-2.5 rounded-full text-sm font-bold transition shadow-lg shadow-amber-500/20 cursor-pointer">
              Pre-Order Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-amber-400 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 block px-3 py-2 text-base font-medium">Home</Link>
            <Link to="/#book" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 block px-3 py-2 text-base font-medium">About Book</Link>
            <Link to="/audiobook" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 block px-3 py-2 text-base font-medium">Audiobook</Link>
            <Link to="/courses" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 block px-3 py-2 text-base font-medium">Courses</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 block px-3 py-2 text-base font-medium">Blog</Link>
            <Link to="/#contact" onClick={() => setIsOpen(false)} className="bg-amber-500 text-slate-900 block px-3 py-2 text-base font-bold rounded-md mt-4 text-center">
              Pre-Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}