import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface VerticalProgressProps {
  sections: Section[];
}

// 动画变体
 const circleVariants = {
   inactive: {
     scale: 1,
     backgroundColor: 'rgba(255, 255, 255, 0.3)',
     borderColor: 'rgba(255, 255, 0.5)',
     boxShadow: 'none',
   },
   active: {
     scale: 1.5,
     backgroundColor: '#dbc18a',
     borderColor: '#dbc18a',
     boxShadow: '0 0 20px rgba(219, 193, 138, 0.8), 0 0 30px rgba(219, 193, 138, 0.4)',
     transition: {
       type: 'spring', 
       stiffness: 400,
       damping: 12,
     },
   },
 };

const lineVariants = {
  inactive: {
    stroke: 'rgba(0, 102, 204, 0.3)',
  },
  active: {
  stroke: '#dbc18a',
    strokeWidth: 2,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const labelVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const VerticalProgress = ({ sections }: VerticalProgressProps) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 初始显示导航栏
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 设置交叉观察器以检测当前可见部分
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = sections.findIndex((section) => section.id === sectionId);
          if (index !== -1 && index !== activeSectionIndex) {
            setActiveSectionIndex(index);
            controls.start('visible');
            
            // 短暂延迟后重置动画，以便下次可以再次触发
            setTimeout(() => {
              controls.start('hidden');
            }, 2000);
          }
        }
      });
    }, options);

    // 观察所有部分
    sections.forEach((section) => {
      if (section.ref.current) {
        observerRef.current?.observe(section.ref.current);
      }
    });

    // 清理观察器
    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          if (section.ref.current) {
            observerRef.current.unobserve(section.ref.current);
          }
        });
        observerRef.current.disconnect();
      }
    };
  }, [sections, controls, activeSectionIndex]);

  return null;
};

export default VerticalProgress;