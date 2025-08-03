import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';


// 文字逐个出现的动画组件
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  // 拆分文字为单个字符
  const characters = text.split("");
  
  // 定义字符动画变体
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div 
      ref={textRef}
      initial="hidden"
      animate={controls}
      className={className}
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-wrap">
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: delay + index * 0.1,
              duration: 0.5,
              ease: [0.2, 0.8, 0.2, 1]
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};


const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // 处理滚动事件的函数
    const handleScroll = () => {
      // 当页面滚动超过50px时隐藏箭头，否则显示箭头
      setIsVisible(window.scrollY <= 50);
    };
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 背景图片 */}
      <div className="fixed inset-0 z-0">
        <motion.img 
          src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/bizhihui_com_20231111130955169967939585653_20250802143138.jpg"
          alt="上海CBD远景" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ 
            scale: [1.05, 1.1, 1.05],
            transition: { 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }
          }}
        />
        {/* 动态渐变叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 animate-gradient-shift"></div>
        
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
        {/* 网格纹理叠加 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwdjEyaC0zdjEyaDMwdjEyaDMwdjEyaDMwVjMwem0wIDBoLTMyVjBoMzJ2MHoiLz48cGF0aCBkPSJNMzYgNGgtM3YzMmgtM3YzMkg0djMyaDR2MzJoNHYzMmg0VjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        {/* 金色光效装饰 - 增强动态效果 */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.8, 0.6, 0.8],
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.4, 0.6],
            x: [0, -15, 15, 0],
            y: [0, 20, -20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        ></motion.div>
        
        {/* 额外动态光效 */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-40 h-40 bg-gold/15 rounded-full filter blur-2xl"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 0.3, 0.5],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
      </div>
      
      {/* 文字内容 */}
       <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-6xl">
       </div>
       
        {/* 向下滑动提示箭头 */}
        {isVisible && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.8, 1, 0.8]
            }}
            exit={{ 
              opacity: 0,
              y: 20,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <i class="fa-solid fa-chevron-down text-gold text-xl"></i>
          </motion.div>
        )}
    </section>
  );
};

export default HeroSection;