import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import VerticalProgress from '../components/VerticalProgress';

// 团队成员数据模型
interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise: string[];
}

// 模拟团队成员数据
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "张明宇",
    position: "首席执行官",
    department: " executive office",
    bio: "前华尔街量化交易总监，拥有15年金融市场经验，麻省理工学院金融工程博士，专注于跨资产类别量化策略研究。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Professional%20businessman%20in%20suit%20black%20gold%20background%20serious%20expression&sign=643056c7587279cc8a5f280a66f40526",
    socialLinks: {
      linkedin: "#",
      email: "#"
    },
    expertise: ["量化策略", "风险管理", "市场分析"]
  },
  {
    id: 2,
    name: "李晓华",
    position: "首席技术官",
    department: "技术部",
    bio: "前谷歌高级工程师，斯坦福大学计算机科学硕士，10年算法开发经验，专注于高性能交易系统架构设计与实现。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=CTO%20in%20modern%20office%20black%20gold%20color%20scheme%20professional%20atmosphere&sign=dc637739a069b198837d7c1166516d6f",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["系统架构", "算法优化", "高频交易"]
  },
  {
    id: 3,
    name: "王哲",
    position: "首席策略师",
    department: "研究部",
    bio: "前摩根士丹利策略分析师，芝加哥大学金融数学博士，专注于宏观经济建模与市场周期分析。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Financial%20analyst%20working%20with%20charts%20black%20gold%20professional%20attire&sign=480a62b27c6e17e5e8191987a7ba3578",
    socialLinks: {
      linkedin: "#",
      email: "#"
    },
    expertise: ["策略研究", "数据分析", "经济建模"]
  },
  {
    id: 4,
    name: "陈思远",
    position: "数据科学总监",
    department: "数据科学部",
    bio: "前亚马逊首席数据科学家，加州大学伯克利分校统计学博士，专注于机器学习在金融预测中的应用研究。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Data%20scientist%20working%20with%20machine%20learning%20models%20black%20gold%20theme&sign=f859cc1f4702d659bcf7b2abb4388815",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    },
    expertise: ["机器学习", "数据挖掘", "预测模型"]
  },
  {
    id: 5,
    name: "刘雅诗",
    position: "设计哲学顾问",
    department: "战略部",
    bio: "清华大学哲学系博士，专注于东方哲学与金融市场秩序研究，将道家思想融入量化模型设计。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Philosopher%20in%20elegant%20attire%20black%20gold%20background%20thoughtful%20expression&sign=9c2aa6b9bc586082579d2f64fba7b5fe",
    socialLinks: {
      linkedin: "#",
      email: "#"
    },
    expertise: ["哲学研究", "系统思维", "战略规划"]
  },
  {
    id: 6,
    name: "赵启明",
    position: "风控总监",
    department: "风险管理部",
    bio: "前美联储高级风险分析师，哥伦比亚大学金融风险管理硕士，专注于复杂金融产品风险评估与控制。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Risk%20manager%20reviewing%20financial%20documents%20black%20gold%20professional%20setting&sign=46232537a1fb12abb2a25776adb79c72",
    socialLinks: {
      linkedin: "#",
      email: "#"
    },
    expertise: ["风险评估", "合规管理", "压力测试"]
  }
];

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
    y: 50,
    scale: 0.95
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const expertiseBadgeVariants = {
  hidden: { 
    opacity: 0,
    x: -10
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3
    }
  }
};

export default function TeamMembers() {
  // 创建各部分的ref
  const teamRef = useRef<HTMLDivElement>(null);
  
  // 定义需要跟踪的部分
  const sections = [
    { id: 'team', label: '团队成员', ref: teamRef },
  ];
  
  // 检测元素是否在视口中
  const isInView = useInView(teamRef, {
    triggerOnce: true,
    margin: "-100px 0px 0px 0px"
  });

  useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <VerticalProgress sections={sections} />
      
      {/* 团队成员部分 */}
      <div id="team" ref={teamRef} className="relative pt-0 pb-20 bg-gradient-to-br from-dark-gray via-black to-dark-gray overflow-hidden">
         {/* 团队头图 */}
          <div className="relative w-full h-[60vh] min-h-[400px] -mt-0 mb-16 overflow-hidden">
            <img 
                 src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/toutu (4)_20250802162009.png"
               alt="专业团队" 
               className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center">
               专业团队
             </h2>
           </div>
         </div>
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 标题区域 */}

          
          {/* 团队成员网格 */}
           {/* 筛选和搜索区域 */}
           <div className="mb-12 border-b border-gold/20 pb-6">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               {/* 筛选下拉菜单 */}
               <div className="flex flex-wrap gap-4">
                 <div className="relative">
                   <select className="bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-gold">
                     <option>区域</option>
                     <option>北京, 中国</option>
                     <option>香港, 中国香港特别行政区</option>
                     <option>上海, 中国</option>
                   </select>
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <i className="fa-solid fa-chevron-down text-gold/50 text-xs"></i>
                   </div>
                 </div>
                 
                 <div className="relative">
                   <select className="bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-gold">
                     <option>行业领域</option>
                     <option>金融科技</option>
                     <option>量化投资</option>
                     <option>风险管理</option>
                   </select>
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <i className="fa-solid fa-chevron-down text-gold/50 text-xs"></i>
                   </div>
                 </div>
                 
                 <div className="relative">
                   <select className="bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-gold">
                     <option>业务领域</option>
                     <option>量化策略</option>
                     <option>数据分析</option>
                     <option>风险管理</option>
                   </select>
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <i className="fa-solid fa-chevron-down text-gold/50 text-xs"></i>
                   </div>
                 </div>
                 
                 <div className="relative">
                   <select className="bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-gold">
                     <option>姓氏</option>
                     <option>张</option>
                     <option>李</option>
                     <option>王</option>
                     <option>陈</option>
                   </select>
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <i className="fa-solid fa-chevron-down text-gold/50 text-xs"></i>
                   </div>
                 </div>
               </div>
               
               {/* 搜索和排序 */}
               <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                 <div className="relative flex-grow sm:flex-grow-0">
                   <input 
                     type="text" 
                     placeholder="输入此处检索" 
                     className="w-full bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pl-10 focus:outline-none focus:border-gold"
                   />
                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/50">
                     <i className="fa-solid fa-search"></i>
                   </div>
                 </div>
                 
                 <div className="relative">
                   <select className="bg-dark-gray border border-gold/30 text-white rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-gold">
                     <option>排序方式：最相关</option>
                     <option>排序方式：姓氏 (A-Z)</option>
                     <option>排序方式：姓氏 (Z-A)</option>
                   </select>
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <i className="fa-solid fa-chevron-down text-gold/50 text-xs"></i>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           {/* 团队成员网格 */}
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             animate={isInView ? "show" : "hidden"}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
           >
             {teamMembers.map((member, index) => (
               <motion.div 
                 key={member.id}
                 variants={cardVariants}
                 className="group bg-dark-gray/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500"
               >
                 <div className="flex flex-col md:flex-row">
                   <div className="md:w-1/3 p-4 flex justify-center md:justify-start">
                     <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gold/20">
                        <img 
                          src="https://lf-code-agent.coze.cn/obj/x-ai-cn/243243315458/attachment/Z (1)_20250802162111.png"
                         alt={member.name} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                     </div>
                   </div>
                   
                   <div className="md:w-2/3 p-4 flex flex-col justify-center">
                     <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                     <p className="text-gold mb-1">{member.position}</p>
                     <p className="text-white/60 text-sm mb-4">{member.department.replace(/^ /, '')}, 中国</p>
                     
                     <button className="text-gold text-sm flex items-center group-hover:text-gold/80 transition-colors w-fit">
                       联系我们
                       <i className="fa-solid fa-arrow-right ml-2 text-xs transform group-hover:translate-x-1 transition-transform"></i>
                     </button>
                   </div>
                 </div>
               </motion.div>
             ))}
           </motion.div>
 
         </div>
      </div>
    </div>
  );
}