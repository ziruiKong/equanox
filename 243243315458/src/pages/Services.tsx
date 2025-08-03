import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import VerticalProgress from '../components/VerticalProgress';

export default function Services() {
  // 创建各部分的ref
  const servicesRef = useRef<HTMLDivElement>(null);
  
  // 定义需要跟踪的部分
  const sections = [
    { id: 'services', label: '专业服务', ref: servicesRef },
  ];

  useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <VerticalProgress sections={sections} />
      
      {/* 专业服务部分 */}
      <div id="services" ref={servicesRef} className="h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-dark-gray to-black">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full filter blur-3xl animate-gradient-shift"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl animate-gradient-shift"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-gold text-center tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            专业服务
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 服务卡片 1 */}
            <motion.div 
              className="bg-dark-gray/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(219,193,138,0.15)"
              }}
            >
              <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-chart-line text-gold text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">市场分析</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                全面的市场研究和趋势分析，帮助识别投资机会与风险，为您的决策提供数据支持。
              </p>
              <a href="#" className="text-gold font-medium flex items-center hover:text-gold/80 transition-colors">
                了解更多 <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
            
            {/* 服务卡片 2 */}
            <motion.div 
              className="bg-dark-gray/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(219,193,138,0.15)"
              }}
            >
              <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-calculator text-gold text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">投资策略</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                根据您的财务目标和风险承受能力，量身定制个性化投资策略，实现资产增值。
              </p>
              <a href="#" className="text-gold font-medium flex items-center hover:text-gold/80 transition-colors">
                了解更多 <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
            
            {/* 服务卡片 3 */}
            <motion.div 
              className="bg-dark-gray/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(219,193,138,0.15)"
              }}
            >
              <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-shield-alt text-gold text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">风险管理</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                先进的风险评估和缓解策略，保护您的投资组合免受市场波动影响，确保资产安全。
              </p>
              <a href="#" className="text-gold font-medium flex items-center hover:text-gold/80 transition-colors">
                了解更多 <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}