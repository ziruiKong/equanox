import { motion } from 'framer-motion';

const AboutIntroduction = () => {
  return (
    <motion.section 
      className="py-20 relative bg-gradient-to-br from-dark-gray via-black to-dark-gray overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 装饰性背景元素 */}
      {/* 增强的背景装饰效果 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* 网格纹理叠加 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwdjEyaC0zdjEyaDMwdjEyaDMwdjEyaDMwVjMwem0wIDBoLTMyVjBoMzJ2MHoiLz48cGF0aCBkPSJNMzYgNGgtM3YzMmgtM3YzMkg0djMyaDR2MzJoNHYzMmg0VjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        {/* 动态金色光晕 */}
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 0.6, 0.8]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-10 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.4, 0.6]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        {/* 装饰性几何元素 */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/10 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 border border-gold/5 rounded-full opacity-20"></div>
        
        {/* 金色渐变光效 */}
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 at-10% 20% to-transparent opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4 tracking-tight">关于我们</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          
          {/* 介绍内容 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <p className="text-white/80 leading-relaxed">
                 EQUANOX 天衡玄同，是一家新一代的国际化量化研究与交易公司，致力于探索数据与哲学、科技与秩序之间的深度融合。我们以"对称之美"为基础，倡导理性智能与感性秩序并存的研究范式，在全球多资产市场中，构建稳定、透明、可扩展的量化决策体系。
               </p>
               <p className="text-white/80 leading-relaxed">
                 "天衡"，意为天地自平衡之道；"玄同"，源自道家对宇宙统一秩序的追求。EQUANOX 以此为名，象征市场的周期性、结构的对称性、模型的普适性，我们相信，在复杂的金融世界里，真正的优势源于对深层规律的洞察与还原。
               </p>
               <p className="text-white/80 leading-relaxed">
                 公司核心团队由数据科学家、算法工程师、经济和金融学者及设计哲学顾问构成，总部位于合肥市。
               </p>
              
              {/* 核心数据 */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="text-center p-4 bg-dark-gray/50 rounded-xl border border-gold/20">
                  <p className="text-3xl font-bold text-gold mb-1">15+</p>
                  <p className="text-white/70 text-sm">行业经验(年)</p>
                </div>
                <div className="text-center p-4 bg-dark-gray/50 rounded-xl border border-gold/20">
                  <p className="text-3xl font-bold text-gold mb-1">50+</p>
                  <p className="text-white/70 text-sm">专业顾问</p>
                </div>
                <div className="text-center p-4 bg-dark-gray/50 rounded-xl border border-gold/20">
                  <p className="text-3xl font-bold text-gold mb-1">30+</p>
                  <p className="text-white/70 text-sm">服务国家</p>
                </div>
                <div className="text-center p-4 bg-dark-gray/50 rounded-xl border border-gold/20">
                  <p className="text-3xl font-bold text-gold mb-1">98%</p>
                  <p className="text-white/70 text-sm">客户满意度</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-gold/30 shadow-xl shadow-gold/10 transform rotate-2 hover:rotate-0 transition-all duration-700">
                 <img 
                  src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/EQUANOX_20250802014626.png" 
                  alt="EQUANOX公司标志" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full filter blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/5 rounded-full filter blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutIntroduction;