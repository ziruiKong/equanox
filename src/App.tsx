  import { Routes, Route } from "react-router-dom";
  import Home from "@/pages/Home";
  import About from "@/pages/About";
  import Services from "@/pages/Services";
  import Portfolio from "@/pages/Portfolio";
  import TeamMembers from "@/pages/TeamMembers";
   import NewsArticle from "@/pages/NewsArticle";
   import NewsPage from "@/pages/NewsPage";
   import ProductDetail from "@/pages/ProductDetail";
  import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
       <Routes>
         <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<TeamMembers />} />
            <Route path="/about/first-case" element={<div className="min-h-screen bg-black py-20 px-6"><h2 className="text-3xl font-bold text-gold mb-8">中国首例案例</h2><div className="text-white/80 leading-relaxed">案例内容正在整理中，敬请期待...</div></div>} />
           <Route path="/services" element={<Services />} />
                 <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
               <Route path="/news" element={<NewsPage />} />
               <Route path="/news/:id" element={<NewsArticle />} />
              <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
       </Routes>
    </AuthContext.Provider>
  );
}
