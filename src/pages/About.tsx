 import { useEffect, useRef } from 'react';
 import Navbar from '../components/Navbar';
 import GuidingPrinciples from '../components/GuidingPrinciples';
 import VerticalProgress from '../components/VerticalProgress';
 import AboutIntroduction from '../components/AboutIntroduction';
 

export default function About() {
  // 创建各部分的ref
   const aboutRef = useRef<HTMLDivElement>(null);
   const introductionRef = useRef<HTMLDivElement>(null);
   
   // 定义需要跟踪的部分
   const sections = [
     { id: 'introduction', label: '公司介绍', ref: introductionRef },
     { id: 'about', label: '核心价值观', ref: aboutRef },
   ];

  useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <VerticalProgress sections={sections} />
      
      {/* 关于我们部分 */}
       {/* 公司介绍部分 */}
       <div id="introduction" ref={introductionRef} className="relative py-20 bg-black">
         <AboutIntroduction />
       </div>
       
       {/* 核心价值观部分 */}
       <div id="about" ref={aboutRef} className="relative bg-cover bg-center min-h-screen flex items-center" 
            style={{ backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Financial%20district%20with%20modern%20architecture%2C%20black%20and%20gold%20color%20scheme%2C%20elegant%20and%20professional%20atmosphere&sign=793ae3a6c246e6e94d19204a4ef7c765)' }}>
         <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-dark-gray/80 opacity-90"></div>
         <GuidingPrinciples />
       </div>
     </div>
  );
}