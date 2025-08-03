import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';



import { getLatestNews } from '../services/news/newsService';
import { NewsItem } from '../services/news/types';

// 获取最新的4条新闻
const newsItems: NewsItem[] = getLatestNews(4);

// 动画变体
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 0 20px rgba(219, 193, 138, 0.3)",
    borderColor: "#dbc18a",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const NewsSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* 增强的背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 网格纹理背景 */}
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
        
        {/* 装饰性几何图形 */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-gold/10 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 border border-gold/5 rounded-full opacity-20"></div>
        
        {/* 金色渐变光效 */}
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 at-10% 20% to-transparent opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题区域 */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">EQUANOX动态</h2>
            <p className="text-gold">EQUANOX News</p>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 10px rgba(219,193,138,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 md:mt-0 bg-transparent border border-gold text-gold px-5 py-2 rounded-md font-medium flex items-center hover:bg-gold/10 transition-all duration-300"
          >
            探索更多
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </motion.button>
        </div>
        
        {/* 装饰分隔线 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12"></div>
        
        {/* 新闻卡片网格 */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
            {newsItems.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group"
            >
               <Link to={item.link} className="flex flex-col h-full">
                <motion.div 
                  className="flex flex-col h-full bg-dark-gray/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gold/10 transition-all duration-500"
                >
                  {/* 新闻图片 */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* 新闻内容 */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-gold text-sm font-medium mb-2">{item.category}</div>
                    <h3 className="text-white font-bold text-lg mb-3 flex-grow line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center mt-auto pt-3">
                      <span className="text-white/60 text-sm">{item.date}</span>
                      <i className="fa-solid fa-arrow-right text-gold/70 group-hover:text-gold transition-colors"></i>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;