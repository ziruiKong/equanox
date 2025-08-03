import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import Navbar from '../components/Navbar';
import { getProductById } from '../services/products/productService';
import { Product } from '../services/products/types';

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading] = useState(true);
  
  useEffect(() => {
    if (!id) {
      navigate('/portfolio');
      return;
    }
    
    // 获取产品详情
    const foundProduct = getProductById(parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/portfolio'); // 如果产品不存在，重定向到投资组合页面
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">加载产品详情中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* 产品详情头部 */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-gold text-sm font-medium bg-gold/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-3 text-white">{product.name}</h1>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-dark-gray/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/20">
                <p className="text-white/60 text-sm">预期年化收益</p>
                <p className="text-white font-bold text-2xl">{product.returnRate}%</p>
              </div>
              
              <div className="bg-dark-gray/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/20">
                <p className="text-white/60 text-sm">投资期限</p>
                <p className="text-white font-bold text-2xl">{product.investmentPeriod}</p>
              </div>
              
              <div className="bg-dark-gray/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/20">
                <p className="text-white/60 text-sm">最低投资额</p>
                <p className="text-white font-bold text-2xl">{formatCurrency(product.minInvestment)}</p>
              </div>
              
              <div className="bg-dark-gray/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/20">
                <p className="text-white/60 text-sm">风险等级</p>
                <p className={`text-white font-bold text-2xl ${getRiskBadgeClass(product.riskLevel)}`}>
                  {getRiskLevelText(product.riskLevel)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 产品详情内容 */}
      <main className="container mx-auto px-6 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* 产品描述 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <i className="fa-solid fa-info-circle text-gold mr-3"></i>产品描述
            </h2>
            <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
              <p className="text-white/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
          </div>
          
          {/* 投资策略 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <i className="fa-solid fa-chess text-gold mr-3"></i>投资策略
            </h2>
            <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
              <p className="text-white/80 leading-relaxed">
                {product.details.strategy}
              </p>
            </div>
          </div>
          
          {/* 资产配置和历史表现 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 资产配置 */}
            <motion.div 
              variants={cardVariants}
              className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20"
            >
              <h3 className="text-xl font-bold text-white mb-6">资产配置</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={product.details.allocation}
                      cx="center"
                      cy="center"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="percentage"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >  
                      {product.details.allocation.map((entry, index) => {
                        // 使用金色系渐变色
                        const colors = ['#dbc18a', '#c2ac75', '#a89660', '#8f7f4b', '#766936'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '占比']}
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        borderColor: '#dbc18a',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {product.details.allocation.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ 
                      backgroundColor: ['#dbc18a', '#c2ac75', '#a89660', '#8f7f4b', '#766936'][index % 5] 
                    }}></div>
                    <span className="text-white/70 text-sm">{entry.assetClass}: {entry.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* 历史表现 */}
            <motion.div 
              variants={cardVariants} 
              className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20"  
            >
              <h3 className="text-xl font-bold text-white mb-6">历史表现</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={product.details.performance.reverse()}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorReturn" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="5%" stopColor="#dbc18a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dbc18a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f3f" />
                    <XAxis 
                      dataKey="period" 
                      stroke="#777777" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#777777"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '收益率']}
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        borderColor: '#dbc18a', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="return" 
                      stroke="#dbc18a" 
                      fillOpacity={1} 
                      fill="url(#colorReturn)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* 产品特点 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center"> 
              <i className="fa-solid fa-star text-gold mr-3"></i>产品特点
            </h2>
            <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {product.details.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-gold mt-1 mr-3">
                      <i className="fa-solid fa-check-circle"></i>
                    </div>
                    <p className="text-white/80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 风险提示 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <i className="fa-solid fa-exclamation-triangle text-gold mr-3"></i>风险提示
            </h2>
            <div className="bg-dark-gray/60 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
              <p className="text-white/70 mb-6">投资有风险，选择需谨慎。以下风险因素请您予以特别关注：</p>
              <ul className="space-y-3">
                {product.details.risks.map((risk, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-gold mt-1 mr-3">
                      <i className="fa-solid fa-exclamation-circle"></i>
                    </div>
                    <p className="text-white/80">{risk}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-gold/10 rounded-lg border border-gold/20 text-white/80 text-sm">
                <p className="flex items-start">
                  <i className="fa-solid fa-info-circle text-gold mt-1 mr-2"></i>
                  <span>本产品为非保本浮动收益类产品，过往业绩不代表未来表现，投资需谨慎。投资者应仔细阅读产品合同和招募说明书，充分了解产品风险，根据自身风险承受能力做出投资决策。</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProductDetail;