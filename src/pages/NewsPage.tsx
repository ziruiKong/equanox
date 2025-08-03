import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VerticalProgress from '../components/VerticalProgress';

 import { useState } from 'react';
import { getAllNews, getNewsByCategory, searchNews, getAllCategories } from '../services/news/newsService';
import { NewsItem } from '../services/news/types';

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

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>(['全部']);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

   // 初始化获取所有新闻和分类
   useEffect(() => {
     setNewsItems(getAllNews());
     setCategories(getAllCategories());
   }, []);
 
   // 当新闻数据变化时重新计算总页数
   useEffect(() => {
     setTotalPages(Math.ceil(newsItems.length / articlesPerPage));
     setCurrentPage(1); // 重置为第一页
  }, []);

  // 当分类或搜索查询变化时筛选新闻
  useEffect(() => {
    let filteredNews = getNewsByCategory(activeCategory);
    
    if (searchQuery) {
      filteredNews = searchNews(searchQuery);
    }
    
    setNewsItems(filteredNews);
  }, [activeCategory, searchQuery]);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  // 创建各部分的ref
  const newsRef = useRef<HTMLDivElement>(null);
  
  // 定义需要跟踪的部分
  const sections = [
    { id: 'news', label: 'EQUANOX动态', ref: newsRef },
  ];

  useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <VerticalProgress sections={sections} />
      
      {/* 页面标题区域 */}
      <header className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
           <img 
             src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/toutu (4)_20250802192608.png" 
            alt="新闻页面背景" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-gold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            EQUANOX动态
          </motion.h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            及时了解EQUANOX的最新动态、市场分析和公司公告
          </motion.p>
        </div>
      </header>
      
       {/* 新闻分类筛选 */}
       <div className="container mx-auto px-6 py-8">
         <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-4 border border-gold/20 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button 
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category 
                      ? 'bg-gold text-black' 
                      : 'bg-transparent hover:bg-gold/10 text-white/70 hover:text-gold'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索新闻..." 
                className="bg-black/50 border border-gold/30 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-gold w-full md:w-64"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/50">
                <i className="fa-solid fa-search"></i>
              </div>
              
              {/* 搜索结果数量提示 */}
              {searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold/70 text-xs">
                  {newsItems.length} 条结果
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 新闻卡片网格 */}
        <motion.div 
          id="news" 
          ref={newsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
           {newsItems
             .slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)
             .map((item) => (
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
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gold text-sm font-medium bg-gold/10 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-white/50 text-xs">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3 flex-grow line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center mt-auto pt-3">
                      <span className="text-gold/70 text-sm">阅读更多</span>
                      <i className="fa-solid fa-arrow-right text-gold/70 group-hover:text-gold transition-colors"></i>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 分页控件 */}
         <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center">
             <span className="text-white/70 mr-3">每页显示:</span>
             <select 
               className="bg-dark-gray border border-gold/30 text-white rounded-md px-3 py-2 focus:outline-none focus:border-gold"
               value={articlesPerPage}
               onChange={(e) => setArticlesPerPage(Number(e.target.value))}
             >
               <option value={4}>4篇</option>
               <option value={8}>8篇</option>
               <option value={12}>12篇</option>
               <option value={16}>16篇</option>
             </select>
           </div>
           
           <div className="flex items-center space-x-2">
             <button 
               className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/50 hover:text-gold hover:border-gold/50 transition-colors"
               disabled={currentPage === 1}
               onClick={() => setCurrentPage(prev => prev - 1)}
             >
               <i className="fa-solid fa-chevron-left"></i>
             </button>
            
             {/* 显示当前页和总页数 */}
             <span className="text-white/70 mx-2">
               第 {currentPage} 页 / 共 {totalPages} 页
             </span>
            
             <button 
               className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/50 hover:text-gold hover:border-gold/50 transition-colors"
               disabled={currentPage === totalPages}
               onClick={() => setCurrentPage(prev => prev + 1)}
             >
               <i className="fa-solid fa-chevron-right"></i>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;