// 新闻项数据模型
export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
  content?: string[];
  author?: string;
  authorTitle?: string;
}