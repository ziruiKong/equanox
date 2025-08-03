import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
  import Navbar from '../components/Navbar';
  import GuidingPrinciples from '../components/GuidingPrinciples';
  import DeclarationModal from '../components/DeclarationModal';
  import VerticalProgress from '../components/VerticalProgress';
  import FinancialInfoModule from '../components/FinancialInfoModule';
  import HomeModules from '../components/HomeModules';
  import HeroSection from '../components/HeroSection';
  import NewsSection from '../components/NewsSection';



export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  
   // 创建各部分的ref
   const heroRef = useRef<HTMLDivElement>(null);
   const contactRef = useRef<HTMLDivElement>(null);
   const newsRef = useRef<HTMLDivElement>(null);
   
   // 定义需要跟踪的部分
    const sections = [
      { id: 'hero', label: '首页', ref: heroRef },
      { id: 'news', label: 'EQUANOX动态', ref: newsRef },
      { id: 'contact', label: '联系我们', ref: contactRef },
    ];

  useEffect(() => {
    // 检查用户是否在当前会话中已经同意
    const previouslyAgreed = sessionStorage.getItem('hasAgreedToDeclaration') === 'true';
    setHasAgreed(previouslyAgreed);
    setShowContent(previouslyAgreed);
  }, []);

  const handleAgree = () => {
    sessionStorage.setItem('hasAgreedToDeclaration', 'true');
    setHasAgreed(true);
    setShowContent(true);
  };

  const handleDisagree = () => {
    // 如果用户不同意，可以重定向到其他页面或显示提示
    alert('您必须同意声明才能访问网站内容');
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
       {/* 声明弹窗 - 现在始终显示直到用户同意 */}
       <DeclarationModal 
         onAgree={handleAgree} 
         onDisagree={handleDisagree} 
         visible={!hasAgreed}
       />

      {/* 网站内容 - 仅在用户同意后显示 */}
      {showContent && (
        <>
          <Navbar />
          <main className="w-full">
   {/* 滚动进度条 */}
   <VerticalProgress sections={sections} />
            
                {/* 全屏头图 - 第一个部分 */}
                <div id="hero" ref={heroRef} className="relative">
                       <HeroSection />
               </div>
               
               {/* 金融信息模块 - 新添加的模块 */}
               <FinancialInfoModule />
             
              {/* 新闻动态模块 */}
              <div id="news" ref={newsRef}>
                <NewsSection />
              </div>
              
              {/* 新增的三个模块 */}
              <HomeModules />
             
              {/* 联系我们 - 第二个部分 */}
               <div id="contact" ref={contactRef} className="h-screen flex items-center relative bg-black">
                 <div className="absolute inset-0">
                   <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c" 
                     alt="Financial advisors in meeting" 
                     className="w-full h-full object-cover opacity-30"
                   />
                 </div>
                 
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                   <div className="max-w-2xl mx-0 md:mx-12">
                     <motion.h2 
                       className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gold tracking-tight"
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                     >
                       联系我们
                     </motion.h2>
                     
                     <motion.p 
                       className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg"
                       initial={{ opacity:.0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                     >
                       专业团队随时为您提供咨询服务，解答您的疑问。填写表单预约专属顾问咨询。
                     </motion.p>
                     
                     <motion.form 
                       className="space-y-6 max-w-md"
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.4 }}
                     >
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  
                         <div>
                           <label className="block text-white/90 mb-2 text-sm font-medium">姓名</label>
                           <input 
                             type="text" 
                             className="w-full bg-dark-gray/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                             placeholder="您的姓名"
                           />
                         </div>
                         <div>
                           <label className="block text-white/90 mb-2 text-sm font-medium">电话</label>
                           <input 
                             type="tel" 
                             className="w-full bg-dark-gray/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                             placeholder="您的联系电话"
                           />
                         </div>
                       </div>
                       <div>
                         <label className="block text-white/90 mb-2 text-sm font-medium">电子邮箱</label>
                         <input 
                           type="email" 
                           className="w-full bg-dark-gray/50 border border-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                           placeholder="您的电子邮箱"
                         />
                       </div>
                       <div>
                         <label className="block text-white/90 mb-2 text-sm font-medium">咨询内容</label>
                         <textarea 
                           className="w-full bg-dark-gray/50 border border-gold/3O rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors h-32 resize-none"
                           placeholder="请简要描述您的咨询需求"
                         ></textarea>
                       </div>
                       <motion.button 
                         type="submit"
                         className="w-full bg-gold text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-gold/90 transition-all transform"
                         whileHover={{ 
                           scale: 1.02,
                           boxShadow: "0 0 15px rgba(219,193,138,0.5)"
                         }}
                         whileTap={{ scale: 0.98 }}
                       >
                         提交咨询
                       </motion.button>
                     </motion.form>
                   </div>
                 </div>
               </div>

          </main>
        </>
      )}
    </div>
  );
}