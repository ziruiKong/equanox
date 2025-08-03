import { products } from './productData';
import { Product } from './types';

// 获取所有产品
export const getAllProducts = (): Product[] => {
  return [...products];
};

// 根据ID获取产品
export const getProductById = (id: number): Product | undefined => {
  return products.find(item => item.id === id);
};

// 获取所有产品分类
export const getProductCategories = (): string[] => {
  const categories = ['全部', ...new Set(products.map(item => item.category))];
  return categories;
};