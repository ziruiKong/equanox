import { motion } from 'framer-motion';

const GuidingPrinciples = () => {
  return (
    <section id="about" className="h-screen flex items-center bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">

          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
           {/* 核心价值观 */}
             <motion.div 
               className="bg-dark-gray/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 shadow-xl hover:shadow-[0_0_30px_rgba(219,193,138,0.15)] transition-all duration-500 hover:-translate-y-2"
               initial={{ opacity: 0, x: -20, rotateY: 5 }}
               animate={{ opacity: 1, x: 0, rotateY: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               whileHover={{
                 rotateY: 2,
                 scale: 1.01,
                 boxShadow: "0 0 30px rgba(219,193,138,0.2)"
               }}
             >
                {/* 金色装饰元素替代图片 */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/30">
                    <i className="fa-solid fa-balance-scale text-gold text-2xl"></i>
                  </div>
                </div>
               
                <h3 className="text-xl font-bold mb-3 text-gold text-center">核心价值观</h3>
                <p className="text-white/70 mb-6 leading-relaxed text-sm text-center max-w-md mx-auto">
                  指导我们提供卓越金融研究服务的核心原则。
                </p>
               
               <div className="space-y-4">
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="bg-gold/20 p-2 rounded-lg mt-0.5">
                     <i className="fa-solid fa-brain text-gold"></i>
                   </div>
                   <div>
                     <h4 className="text-base font-semibold mb-0.5 text-white">数据驱动洞察</h4>
                     <p className="text-white/70 text-sm">将复杂金融数据转化为可操作情报</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="bg-gold/20 p-2 rounded-lg mt-0.5">
                     <i className="fa-solid fa-shield-alt text-gold"></i>
                   </div>
                   <div>
                     <h4 className="text-base font-semibold mb-0.5 text-white">诚信正直</h4>
                     <p className="text-white/70 text-sm">建立在诚实透明的道德标准之上</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="bg-gold/20 p-2 rounded-lg mt-0.5">
                     <i className="fa-solid fa-lightbulb text-gold"></i>
                   </div>
                   <div>
                     <h4 className="text-base font-semibold mb-0.5 text-white">创新精神</h4>
                     <p className="text-white/70 text-sm">保持金融分析技术前沿地位</p>
                   </div>
                 </motion.div>
               </div>
               
               <motion.button 
                 className="mt-4 flex items-center text-gold font-medium hover:text-gold/80 transition-colors text-sm"
                 whileHover={{ x: 5 }}
               >
                 了解更多 <i className="fa-solid fa-arrow-right ml-2"></i>
               </motion.button>
             </motion.div>
           
           {/* 我们的使命 */}
             <motion.div 
               className="bg-dark-gray/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 shadow-xl hover:shadow-[0_0_30px_rgba(219,193,138,0.15)] transition-all duration-500 hover:-translate-y-2"
               initial={{ opacity: 0, x: 20, rotateY: -5 }}
               animate={{ opacity: 1, x: 0, rotateY: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               whileHover={{
                 rotateY: -2,
                 scale: 1.01,
                 boxShadow: "0 0 30px rgba(219,193,138,0.2)"
               }}
             >
                {/* 金色装饰元素替代图片 */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/30">
                    <i className="fa-solid fa-compass text-gold text-2xl"></i>
                  </div>
                </div>
               
                <h3 className="text-xl font-bold mb-3 text-gold text-center">我们的使命</h3>
                <p className="text-white/70 mb-6 leading-relaxed text-sm text-center max-w-md mx-auto">
                  为金融决策者提供精准清晰信息，助力明智投资决策。
                </p>
               
               <div className="space-y-4">
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="text-gold text-lg mt-0.5">
                     <i className="fa-solid fa-check-circle"></i>
                   </div>
                   <div>
                     <p className="text-white/90 leading-relaxed text-sm">让复杂金融分析不再局限于机构参与者</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="text-gold text-lg mt-0.5">
                     <i className="fa-solid fa-check-circle"></i>
                   </div>
                   <div>
                     <p className="text-white/90 leading-relaxed text-sm">弥合金融数据与战略决策之间的差距</p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-gray/50 transition-all duration-300"
                   whileHover={{
                     backgroundColor: "rgba(219, 193, 138, 0.05)",
                     translateX: 5
                   }}
                 >
                   <div className="text-gold text-lg mt-0.5">
                     <i className="fa-solid fa-check-circle"></i>
                   </div>
                   <div>
                     <p className="text-white/90 leading-relaxed text-sm">创建工具帮助客户驾驭波动的金融市场</p>
                   </div>
                 </motion.div>
               </div>
               
               <motion.button 
                 className="mt-4 bg-gold text-black px-6 py-3 rounded-md font-medium hover:bg-gold/90 transition-all transform w-full"
                 whileHover={{ 
                   scale: 1.02,
                   boxShadow: "0 0 15px rgba(219,193,138,0.5)"
                 }}
                 whileTap={{ scale: 0.98 }}
               >
                 开始咨询
               </motion.button>
             </motion.div>
         </div>
       </div>
     </section>
  );
};

export default GuidingPrinciples;