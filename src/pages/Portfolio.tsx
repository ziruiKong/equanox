import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllProducts, getProductCategories } from '../services/products/productService';
import { Product } from '../services/products/types';

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

export default function Portfolio() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['全部']);
  const [activeCategory, setActiveCategory] = useState('全部');
  
  useEffect(() => {
    // 获取所有产品和分类
    setProducts(getAllProducts());
    setCategories(getProductCategories());
    
    // 滚动到顶部
    window.scrollTo(0, 0);
  }, []);
  
  // 格式化货币
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // 获取风险等级徽章样式
  const getRiskBadgeClass = (riskLevel: string) => {
    switch(riskLevel) {
      case 'low':
        return 'bg-green-500/20 text-green-400';
      case 'medium':  
        return 'bg-yellow-500/20 text-yellow-400';
      case 'high':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // 获取风险等级文本
  const getRiskLevelText = (riskLevel: string) => {
    switch(riskLevel) {
      case 'low':
        return '低风险';
      case 'medium':
        return '中风险';
      case 'high':
        return '高风险';
      default:
        return '未知风险';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* 页面标题区域 */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>  
          <img 
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Investment%20products%20showcase%20black%20gold%20theme%20elegant%20professional&sign=c816a052ab443e7d196dad7987244dec" 
            alt="投资产品" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">  
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gold tracking-tight">
            投资产品
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">探索我们精心设计的投资产品系列，满足不同风险偏好和投资目标</p>
        </div>
      </header>
      
      {/* 产品分类 */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-4 border border-gold/20 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {categories.map(category => (
              <button 
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
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
        </div>
        
        {/* 产品卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group"
            >
              <Link to={`/products/${product.id}`} className="flex flex-col h-full">
                <div className="flex flex-col h-full bg-dark-gray/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gold/10 transition-all duration-500">
                  {/* 产品图片 */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* 产品内容 */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-gold text-sm font-medium bg-gold/10 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskBadgeClass(product.riskLevel)}`}>
                        {getRiskLevelText(product.riskLevel)}
                      </span>  
                    </div>                    
                    <h3 className="text-white font-bold text-xl mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="text-white/60 text-xs mb-1">预期年化收益</p>
                        <p className="text-white font-bold text-lg">{product.returnRate}%</p>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="text-white/60 text-xs mb-1">最低投资额</p>
                        <p className="text-white font-bold text-lg">{formatCurrency(product.minInvestment)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gold/10">
                      <span className="text-gold/70 text-sm">投资期限: {product.investmentPeriod}</span>  
                      <button className="bg-gold text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gold/90 transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}