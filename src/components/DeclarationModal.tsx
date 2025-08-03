import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DeclarationModalProps {
  onAgree: () => void;
  onDisagree: () => void;
  visible: boolean;
}

// 定义动画变体
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, backdropFilter: "blur(8px)" },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  tap: {
    scale: 0.98
  }
};

const DeclarationModal = ({ onAgree, onDisagree, visible }: DeclarationModalProps) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  
  // 处理同意逻辑
  const handleAgree = () => {
    localStorage.setItem('hasAgreedToDeclaration', 'true');
    onAgree();
  };

  // 处理不同意逻辑
  const handleDisagree = () => {
    onDisagree();
  };

  // 内容加载完成后才显示动画
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIsContentLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsContentLoaded(false);
    }
  }, [visible]);

  // 当弹窗不可见时不渲染
  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
       {/* 背景遮罩层 - 毛玻璃效果 */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 transition-all duration-500 backdrop-blur-3xl"
          onClick={handleDisagree}
      >
         {/* 金色EQUANOX文字背景 */}
         <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
           <motion.div
             initial={{ opacity: 0.2, scale: 1.2 }}
             animate={{ opacity: 0.3, scale: 1.1 }}
             transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
             className="text-[clamp(5rem,20vw,15rem)] font-black text-gold tracking-wider"
             style={{
               textShadow: "0 0 20px rgba(219, 193, 138, 0.5), 0 0 40px rgba(219, 193, 138, 0.3)",
               opacity: 0.3
             }}
           >
             EQUANOX
           </motion.div>
         </div>
         
         {/* 弹窗内容 */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate={isContentLoaded ? "visible" : "hidden"}
          exit="exit"
       className="w-full max-w-md sm:max-w-md bg-dark-gray/85 backdrop-blur-3xl rounded-2xl shadow-2xl overflow-hidden border border-gold/30 transform transition-all duration-700 hover:shadow-[0_0_40px_rgba(219,193,138,0.3)]"
          onClick={(e) => e.stopPropagation()} // 防止点击弹窗内部关闭弹窗
        >
          {/* 弹窗头部 */}
          <div className="relative">
            {/* 黑金主题头部背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-dark-gray z-0"></div>
            
            {/* 装饰性金色元素 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            
            {/* 标题区域 */}
              <div className="relative z-10 p-4 md:p-6 text-center">
                <img src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/未命名的设计_20250801234031.png" alt="EQUANOX Logo" className="mx-auto mb-4 w-24 h-auto" />
               <h2 className="text-xl md:text-2xl font-bold text-gold mb-2 tracking-tight">网站访问者申明与承诺</h2>
              <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
          
          {/* 弹窗内容区域 */}
            <div className="p-2 md:p-3 max-h-[45vh] overflow-y-auto modal-scrollbar text-white/90 text-sm">
             <div className="prose prose-invert max-w-none text-white/80 text-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
              <p className="mb-6 leading-relaxed">
                在继续浏览本公司网站前，请您审阅此重要提示，并确认您或您所代表的机构是一名"合格投资者"。所谓"合格投资者"，是指根据《中华人民共和国证券投资基金法》、《中华人民共和国私募投资基金监督管理暂行办法》及/或中国大陆其他相关法律法规、自律规则的规定，参与投资本公司管理的私募基金产品的人士至少满足如下要求：
              </p>
              
              <h3 className="text-xl font-semibold text-gold mt-8 mb-4">一、具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的单位和个人：</h3>
              
              <ul className="list-disc pl-6 mb-6 space-y-3">
                <li>净资产不低于1000万元的单位；</li>
                <li>金融资产不低于300万元或者最近三年年均收入不低于50万元的个人。（前述金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。）</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gold mt-8 mb-4">二、下列投资者视为合格投资者：</h3>
              
              <ol className="list-decimal pl-6 mb-6 space-y-3">
                <li>社会保障基金、企业年金等养老基金，慈善基金等社会公益基金；</li>
                <li>国务院金融监督管理机构监管的机构依法发行的资产管理产品、依法设立并在基金业协会备案的私募基金；</li>
                <li>合格境外机构投资者、人民币合格境外机构投资者；</li>
                <li>投资于所管理私募基金的私募基金管理人及其从业人员；</li>
                <li>中国证监会规定的其他投资者。</li>
              </ol>
            </div>
          </div>
          
          {/* 弹窗底部按钮区域 */}
            <div className="p-3 md:p-4 border-t border-gold/20 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
              {/* 不同意按钮 */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDisagree}
           className="flex-1 px-5 py-2 bg-transparent border border-white/30 text-white rounded-lg font-semibold hover:border-white/60 transition-all duration-300 text-sm"
              >
                不同意
              </motion.button>
              
              {/* 同意按钮 - 金色主题强调 */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAgree}
            className="flex-1 px-6 py-2 bg-gold text-black rounded-lg font-semibold shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 text-sm hover:bg-gold/90"
              >
                同意并继续
              </motion.button>
            </div>
            
            {/* 底部说明文字 */}
             <p className="text-center text-white/50 text-xs mt-4">
              点击"同意并继续"，即表示您确认您是合格投资者并接受本网站的使用条款
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeclarationModal;