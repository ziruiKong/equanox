import { newsItems } from './newsData';
import { NewsItem } from './types';

// 获取所有新闻
export const getAllNews = (): NewsItem[] => {
  return [...newsItems];
};

// 获取最新的n条新闻
export const getLatestNews = (count: number): NewsItem[] => {
  return [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

// 根据ID获取新闻
export const getNewsById = (id: number): NewsItem | undefined => {
  return newsItems.find(item => item.id === id);
};

// 根据分类获取新闻
export const getNewsByCategory = (category: string): NewsItem[] => {
  if (category === '全部') return getAllNews();
  
  return newsItems.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
};

// 搜索新闻
export const searchNews = (query: string): NewsItem[] => {
  if (!query.trim()) return getAllNews();
  
  const lowerCaseQuery = query.toLowerCase();
  
  return newsItems.filter(item => 
    item.title.toLowerCase().includes(lowerCaseQuery) || 
    (item.content && item.content.some(paragraph => 
      paragraph.toLowerCase().includes(lowerCaseQuery)
    )) ||
    item.category.toLowerCase().includes(lowerCaseQuery)
  );
};

// 获取所有新闻分类
export const getAllCategories = (): string[] => {
  const categories = ['全部', ...new Set(newsItems.map(item => item.category))];
  return categories;
};