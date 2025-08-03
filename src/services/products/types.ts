export interface Product {
  id: number;
  name: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  returnRate: number;
  investmentPeriod: string;
  minInvestment: number;
  description: string;
  imageUrl: string;
  details: ProductDetail;
}

export interface ProductDetail {
  strategy: string;
  allocation: AllocationItem[];
  performance: PerformanceData[];
  features: string[];
  risks: string[];
}

export interface AllocationItem {
  assetClass: string;
  percentage: number;
}

export interface PerformanceData {
  period: string;
  return: number;
  benchmark: number;
}