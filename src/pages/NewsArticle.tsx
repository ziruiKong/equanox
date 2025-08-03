import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

// 新闻文章数据接口
interface NewsArticleType {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  content: string[];
  author?: string;
  authorTitle?: string;
}

// 模拟最新动态数据
const latestNews = [
  { id: 1, title: "EQUANOX赫兹中性8号私募证券投资基金成立公告", date: "2025-07-01" },
  { id: 2, title: "关于开放EQUANOX赫兹中性8号私募证券投资基金募集期的公告", date: "2025-06-30" },
  { id: 3, title: "\"羽林争霸\"圆满落幕 --下个赛场，敬请期待", date: "2025-06-20" },
  { id: 4, title: "EQUANOX投资关于公司官网与微信服务号升级完成的公告", date: "2025-05-07" },
];

import { getNewsById } from '../services/news/newsService';
import { NewsItem } from '../services/news/types';

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
     if (!id) {
       navigate('/');
       return;
     }
     
     // 模拟API请求延迟
     const timer = setTimeout(() => {
       const foundArticle = getNewsById(parseInt(id));
       if (foundArticle) {
        setArticle(foundArticle);
        // 设置默认激活的标签
       } else {
        navigate('/'); // 如果文章不存在，重定向到首页
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  // 根据选择的字号设置内容样式
  const getContentClass = () => {
    switch(fontSize) {
      case "large":
        return "text-xl";
      case "medium":
        return "text-lg";
      case "small":
        return "text-base";
      default:
        return "text-lg";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
       {/* 简约风格头部横幅 */}
      <div className="relative w-full h-64 overflow-hidden">
        <img 
          src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Minimalist%20financial%20background%2C%20clean%20lines%2C%20professional%2C%20elegant%2C%20black%20and%20gold%20color%20scheme&sign=41006165f5870140ec129eb50b2ee7f8" 
          alt="简约金融背景" 
          className="w-full h-full object-cover"
        />
         <div className="absolute inset-0 flex items-center justify-center">
           {/* 背景图片 */}
           <div className="absolute inset-0 z-0">
             <img 
               src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/红黄绿色创意卡通风自我介绍求职简历作品集演示文稿 (3)_20250802152342.png" 
               alt="背景图片" 
               className="w-full h-full object-cover"
             />
           </div>
           {/* 渐变叠加层 */}
           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-gold/20 z-10"></div>
           {/* 文字内容 */}
           <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 z-20"></h1>
        </div>
      </div>
      
       <main className="container mx-auto px-4 py-8 bg-gradient-to-br from-gold/20 to-gold/5 min-h-screen">

        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧主内容区 */}
          <div className="lg:w-2/3">
             {/* 标签切换已移除 */}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 文章标题 */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {article.title}
                </h1>
                
                 {/* 字号切换 */}
                   <div className="flex items-center space-x-3 text-sm bg-gold/5 border border-gold/30 px-3 py-1.5 rounded-md backdrop-blur-sm shadow-lg shadow-gold/5">
                    <span className="text-gold/70">字号：</span>
                    <button 
                      className={`px-3 py-1 rounded-md transition-all duration-300 ${fontSize === "small" ? "bg-gold text-black font-medium shadow-md shadow-gold/20" : "text-gold/70 hover:text-gold hover:bg-gold/10"}`}
                      onClick={() => setFontSize("small")}
                    >小</button>
                    <button 
                      className={`px-3 py-1 rounded-md transition-all duration-300 ${fontSize === "medium" ? "bg-gold text-black font-medium shadow-md shadow-gold/20" : "text-gold/70 hover:text-gold hover:bg-gold/10"}`}
                      onClick={() => setFontSize("medium")}
                    >中</button>
                    <button 
                      className={`px-3 py-1 rounded-md transition-all duration-300 ${fontSize === "large" ? "bg-gold text-black font-medium shadow-md shadow-gold/20" : "text-gold/70 hover:text-gold hover:bg-gold/10"}`}
                      onClick={() => setFontSize("large")}
                    >大</button>
                  </div>
              </div>
              
              {/* 文章信息 */}
              <div className="flex justify-between items-center mb-8 text-gray-400 text-sm">
                <div>发布时间：{article.date}</div>
                <div>来源：EQUANOX投资管理有限公司</div>
              </div>
              
              {/* 文章内容 */}
             <div className={`prose max-w-none leading-relaxed ${getContentClass()} bg-white/70 backdrop-blur-2xl p-8 rounded-xl shadow-2xl`}>
                  {article.content?.map((paragraph, index) => (
                    <p key={index} className="mb-6 text-black">
                      {paragraph}
                    </p>
                  )) ?? <p className="text-gray-600 italic">暂无内容</p>}
               </div>
              
              {/* 返回按钮 */}
              <div className="mt-12">
                <button
                   onClick={() => navigate('/news')}
                  className="inline-flex items-center bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 px-4 py-2 rounded transition-colors"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  返回列表
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* 右侧边栏 */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900/50 rounded-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                  <span className="text-2xl font-bold text-blue-400">30</span>
                </div>
                <div>
                  <div className="text-xs text-gray-500">2025-06</div>
                  <div className="w-full bg-gray-700 h-1 mt-1">
                    <div className="bg-blue-500 h-1 w-3/4"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">最新动态</h3>
              
              <ul className="space-y-4">
                {latestNews.map((item, index) => (
                  <li key={item.id} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                    <Link to={`/news/${item.id}`} className="hover:text-blue-400 transition-colors line-clamp-2">
                      {item.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-2">{item.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsArticle;