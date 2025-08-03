import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "赫兹中性8号私募证券投资基金",
    category: "市场中性策略",
    riskLevel: "medium",
    returnRate: 15.2,
    investmentPeriod: "12个月+",
    minInvestment: 100000,
    description: "采用先进的量化模型和风险控制体系，旨在为投资者提供长期稳定的绝对收益",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Financial%20investment%20product%20black%20gold%20theme&sign=be6d0b19ca098a9f4fde098fb6d241ea",
    details: {
      strategy: "通过多因子选股模型和期货对冲，实现市场中性",
      allocation: [
        { assetClass: "股票", percentage: 60 },
        { assetClass: "债券", percentage: 30 },
        { assetClass: "现金", percentage: 10 }
      ],
      performance: [
        { period: "3个月", return: 3.2, benchmark: 1.5 },
        { period: "6个月", return: 7.8, benchmark: 3.2 },
        { period: "12个月", return: 15.2, benchmark: 8.5 }
      ],
      features: [
        "低市场相关性",
        "多策略组合",
        "严格风险控制",
        "专业团队管理"
      ],
      risks: [
        "市场波动风险",
        "流动性风险",
        "模型失效风险"
      ]
    }
  },
  {
    id: 2,
    name: "天衡宏观配置私募证券投资基金",
    category: "宏观策略",
    riskLevel: "high",
    returnRate: 22.5,
    investmentPeriod: "24个月+",
    minInvestment: 300000,
    description: "基于宏观经济分析的多资产配置策略，把握全球市场趋势",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Global%20investment%20strategy%20black%20gold%20theme%2C%20professional%2C%20elegant&sign=92ef2d776a0b8465a4e1c1449ab163a4",
    details: {
      strategy: "基于宏观经济周期分析，动态调整全球多资产配置",
      allocation: [
        { assetClass: "股票", percentage: 45 },
        { assetClass: "债券", percentage: 25 },
        { assetClass: "商品", percentage: 15 },
        { assetClass: "现金", percentage: 15 }
      ],
      performance: [
        { period: "3个月", return: 4.5, benchmark: 2.2 },
        { period: "6个月", return: 10.2, benchmark: 5.8 },
        { period: "12个月", return: 22.5, benchmark: 12.3 }
      ],
      features: [
        "全球资产配置",
        "宏观经济驱动",
        "多空灵活操作",
        "趋势跟踪系统"
      ],
      risks: [
        "宏观经济风险",
        "汇率风险",
        "政策变动风险"
      ]
    }
  },
  {
    id: 3,
    name: "玄同量化精选私募证券投资基金",
    category: "量化选股",
    riskLevel: "medium",
    returnRate: 18.7,
    investmentPeriod: "12个月+",
    minInvestment: 100000,
    description: "利用先进的量化模型精选优质个股追求超额收益",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Quantitative%20investment%20strategy%20black%20gold%20theme%2C%20modern%2C%20professional&sign=8eabf6b6a76701c0684191a0655a80c5",
    details: {
      strategy: "通过多因子模型和机器学习算法，精选具有上涨潜力的个股",
      allocation: [
        { assetClass: "大盘股", percentage: 40 },
        { assetClass: "中盘股", percentage: 35 },
        { assetClass: "小盘股", percentage: 15 },
        { assetClass: "现金", percentage: 10 }
      ],
      performance: [
        { period: "3个月", return: 3.8, benchmark: 2.5 },
        { period: "6个月", return: 9.5, benchmark: 6.2 },
        { period: "12个月", return: 18.7, benchmark: 11.8 }
      ],
      features: [
        "多因子选股模型",
        "机器学习优化",
        "风险预算控制",
        "行业分散配置"
      ],
      risks: [
        "模型风险",
        "市场集中度风险",
        "流动性风险"
      ]
    }
  }
];