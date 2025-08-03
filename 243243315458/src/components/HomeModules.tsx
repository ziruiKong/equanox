import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// 定义模块数据接口
interface ModuleItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isImageOnRight?: boolean;
}

 // 模块数据 - 三栏
 const modules: ModuleItem[] = [
   {
     id: 1,
     title: "关于防范诈骗的警示",
     description: "通过天衡玄同官方网站和社交媒体账户核实信息，谨防诈骗",
     imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Financial%20security%20building%20architecture&sign=9163f786c1fc25919c5e76bc4a74e70a",
     link: "/security-alert",
     isImageOnRight: false
   },
   {
     id: 2,
     title: "访问媒体中心",
     description: "了解天衡玄同最新动态和近期项目信息。",
     imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Abstract%20artistic%20brush%20strokes&sign=098d594983af3aacdcb430cc889d3997",
     link: "/media-center",
     isImageOnRight: true
   },
   {
     id: 3,
     title: "加入我们",
     description: "我们欢迎富有才华与活力的人才加入我们。",
     imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Business%20team%25collaboration%20diversity&sign=86f2452f5be7de2b46686eae38ad59ae",
     link: "/careers",
     isImageOnRight: false
   }
];

// 动画变体
const moduleVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// 导航点变体
const dotVariants = {
  inactive: {
    scale: 0.8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.3 }
  },
  active: {
    scale: 1.2,
    backgroundColor: "#dbc18a",
    boxShadow: "0 0 10px rgba(219, 193, 138, 0.6)",
    transition: { duration: 0.3 }
  }
};

const HomeModules = () => {
  const [activeModule, setActiveModule] = useState(0);
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // 监听滚动，更新当前激活的模块
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      moduleRefs.current.forEach((ref, index) => {
        if (ref) {
          const moduleTop = ref.offsetTop;
          const moduleBottom = moduleTop + ref.offsetHeight;
          
          if (scrollPosition >= moduleTop && scrollPosition < moduleBottom) {
            setActiveModule(index);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到指定模块
  const scrollToModule = (index: number) => {
    if (moduleRefs.current[index]) {
      window.scrollTo({
        top: moduleRefs.current[index]?.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (  
     <div className="relative">
       {/* 全屏模块容器 - 使用flex column实现无缝连接 */}
       <div className="flex flex-col h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
         {modules.map((module, index) => (
           <motion.section
             key={module.id}
             ref={el => moduleRefs.current[index] = el}
             variants={moduleVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.5 }}
              className="h-screen w-full relative overflow-hidden snap-start"
           >
           <div className={`flex flex-col ${module.isImageOnRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-full`}>
             {/* 图片部分 - 占满一半宽度和整个高度 */}
             <div className="w-full lg:w-1/2 h-64 lg:h-full relative">
               <img 
                 src={module.imageUrl} 
                 alt={module.title} 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               {/* 渐变叠加层 */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
             </div>
             
             {/* 文字内容部分 - 占满一半宽度和整个高度 */}
             <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8 lg:p-16 relative z-10">
               <div className="max-w-lg mx-auto">
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{module.title}</h3>
                 <p className="text-white/70 mb-8 leading-relaxed text-lg">{module.description}</p>
                 
                 <motion.a
                   href={module.link}
                   whileHover={{ 
                     scale: 1.05,
                     boxShadow: "0 0 15px rgba(219,193,138,0.3)"
                   }}
                   whileTap={{ scale: 0.98 }}
                   className="inline-flex items-center text-gold font-medium group/button"
                 >
                   <span>阅读更多</span>
                   <i className="fa-solid fa-arrow-right ml-2 text-sm transition-transform group-hover/button:translate-x-1"></i>
                 </motion.a>
               </div>
             </div>
           </div>
         </motion.section>
       ))}
       </div>
       


     </div>
  );
};

export default HomeModules;