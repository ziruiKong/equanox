 import { useState, useEffect } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { cn } from '@/lib/utils';
 

import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  // Determine if a nav item is active based on current path
  const isActive = (path: string) => {
    // Special handling for anchor links
    if (path === '#contact') {
      return location.hash === '#contact';
    }
    if (path === '#news') {
      return location.hash === '#news';
    }
    return location.pathname === path;
  };


  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
     <nav className={cn(
       'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
       isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-lg shadow-gold/5' : 'bg-transparent py-5'
     )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
               <img 
                 src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/EQUANOX (1)_20250803000306.png" 
                 alt="EQUANOX Logo" 
                 className="w-14 h-14 object-contain"
                 />
                <img 
  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/toutu (6)_20250803000032.png" 
                  alt="EQUANOX" 
                  className="h-16 w-auto object-contain"
                />
             </a>

            {/* Desktop Navigation */}
             <div className="hidden md:flex items-center space-x-8">
                 <Link 
                  to="/" 
                  className={`transition-all duration-300 ${
                    isActive('/') 
                      ? 'font-bold text-gold text-shadow-[0_0_8px_rgba(219,193,138,0.8)]' 
                      : 'text-white/80 hover:text-gold'
                  }`}
                >首页</Link>
                {/* 关于我们下拉菜单 */}
                 <div className="relative">
                  <div className="border-b border-gray-300 pb-1">
                    <button 
                      className="flex items-center justify-between w-full text-white/80 hover:text-gold transition-colors focus:outline-none"
                      aria-expanded={isAboutDropdownOpen}
                      aria-haspopup="true"
                      onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                    >
                      <span>概述</span>
                      <i className="fa-solid fa-chevron-down ml-2 text-xs text-gold"></i>
                    </button>
                  </div>
                  
                  {/* 下拉子菜单 */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isAboutDropdownOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                     className="absolute left-0 mt-1 bg-white/5 backdrop-blur-md rounded-md overflow-hidden z-50 flex space-x-1 px-1 py-1"
                  >
                      <Link 
  to="/about" 
   className={`px-4 py-2 transition-colors text-xs whitespace-nowrap ${
    isActive('/about') ? 'font-bold text-gold' : 'text-white/80 hover:text-gold'
  }`}
  onClick={() => setIsAboutDropdownOpen(false)}
>
  关于我们
</Link>
                      <Link 
   to="/about/first-case" 
    className="px-4 py-2 text-white/80 hover:text-gold transition-colors text-xs whitespace-nowrap"
   onClick={() => setIsAboutDropdownOpen(false)}
 >
                       中国首例
                     </Link>
                     <Link 
   to="/about/team" 
    className="px-4 py-2 text-white/80 hover:text-gold transition-colors text-xs whitespace-nowrap"
   onClick={() => setIsAboutDropdownOpen(false)}
 >
                       团队成员
                     </Link>
                     <Link 
  to="/about/awards" 
   className="px-4 py-2 text-white/80 hover:text-gold transition-colors text-xs whitespace-nowrap"
  onClick={() => setIsAboutDropdownOpen(false)}
>
                      荣誉奖项
                    </Link>
                  </motion.div>
                </div>
                 <Link 
                  to="/services" 
                  className={`transition-all duration-300 ${
                    isActive('/services') 
                      ? 'font-bold text-gold text-shadow-[0_0_8px_rgba(219,193,138,0.8)]' 
                      : 'text-white/80 hover:text-gold'
                  }`}
                >服务</Link>
                <Link 
                   to="/portfolio" 
                   className={`transition-all duration-300 ${
                     isActive('/portfolio') 
                       ? 'font-bold text-gold text-shadow-[0_0_8px_rgba(219,193,138,0.8)]' 
                       : 'text-white/80 hover:text-gold'
                   }`}
                  >投资组合</Link>
                  <Link 
                    to="/news" 
                    className={`transition-all duration-300 ${
                      isActive('/news') 
                        ? 'font-bold text-gold text-shadow-[0_0_8px_rgba(219,193,138,0.8)]' 
                        : 'text-white/80 hover:text-gold'
                    }`}
                  >新闻</Link>
                  <Link
                   to="/#contact" 
                   className={`transition-all duration-300 ${
                     isActive('#contact') 
                       ? 'font-bold text-gold text-shadow-[0_0_8px_rgba(219,193,138,0.8)]' 
                       : 'text-white/80 hover:text-gold'
                   }`}
                 >联系我们</Link>
              <button className="bg-gold text-black px-5 py-2 rounded-md font-medium hover:bg-gold/90 transition-all transform hover:scale-105">
                开始使用
              </button>
            </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-800 flex flex-col space-y-4">
               <Link to="/" className="text-white hover:text-gold transition-colors font-medium py-2">首页</Link>
                <div className="py-2">
                  <button 
                    className="flex items-center justify-between w-full text-left text-white/80 hover:text-gold transition-colors"
                    onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  >
                    关于我们
                    <i className={`fa-solid fa-chevron-down ml-1 text-xs transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {isAboutDropdownOpen && (
                    <div className="mt-1 ml-4 space-y-2">
                      <Link 
                        to="/about" 
                        className="block text-white/70 hover:text-gold transition-colors py-1"
                        onClick={() => {
                          setIsAboutDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        公司介绍
                      </Link>
                      <Link 
                        to="/about/team" 
                        className="block text-white/70 hover:text-gold transition-colors py-1"
                        onClick={() => {
                          setIsAboutDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        团队成员
                      </Link>
                    </div>
                  )}
                </div>
               <Link to="/services" className="text-white/80 hover:text-gold transition-colors py-2">服务</Link>
               <Link to="/portfolio" className="text-white/80 hover:text-gold transition-colors py-2">投资组合</Link>
               <Link to="/#news" className="text-white/80 hover:text-gold transition-colors py-2">新闻</Link>
                <Link to="/#contact" className="text-white/80 hover:text-gold transition-colors py-2">联系我们</Link>
              <button className="bg-gold text-black px-5 py-3 rounded-md font-medium hover:bg-gold/90 transition-all w-full">
                开始使用
              </button>
            </div>
          )}
      </div>
    </nav>
  );
};

export default Navbar;