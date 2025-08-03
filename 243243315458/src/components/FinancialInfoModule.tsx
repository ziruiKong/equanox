import { useEffect } from 'react';

const FinancialInfoModule = () => {
  useEffect(() => {
    // 动态加载Finlogix Widget脚本
    const script = document.createElement('script');
    script.src = 'https://widget.finlogix.com/Widget.js';
    script.type = 'text/javascript';
    
    script.onload = () => {
      // 脚本加载完成后初始化Widget
// @ts-expect-error Widget is loaded dynamically from external script
      if (window.Widget) {
        window.Widget.init({
          widgetId: "f4dcd590-9a8a-4068-a3b3-ad1541366531",
          type: "BigChart",
          language: "zh",
          showBrand: true,
          isShowTradeButton: true,
          isShowBeneathLink: true,
          isShowDataFromACYInfo: true,
          symbolName: "NAS100",
          hasSearchBar: false,
          hasSymbolName: false,
          hasSymbolChange: false,
          hasButton: false,
          chartShape: "candles",
          timePeriod: "D1",
          isAdaptive: true
        });
      }
    };
    
    document.body.appendChild(script);
    
    // 组件卸载时清理脚本
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
     <div className="my-16 py-12 px-6 md:px-12 bg-dark-gray">
      <div className="relative bg-gradient-to-br from-dark-gray to-black p-6 md:p-8 rounded-2xl border border-gold/30 shadow-xl shadow-gold/5 transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(219,193,138,0.2)]">
        {/* 标题区域 */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gold flex items-center">
            <i className="fa-solid fa-chart-line mr-3"></i>市场金融数据
          </h3>
          <div className="text-sm text-white/60 bg-dark-gray/50 px-3 py-1 rounded-full">
            实时更新
          </div>
        </div>
        
        {/* 装饰分隔线 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8"></div>
        
        {/* Finlogix Widget容器 */}
        <div className="finlogix-container w-full rounded-xl overflow-hidden border border-gray-700"></div>
        
        {/* 底部说明文字 */}
        <p className="text-xs text-white/50 mt-4 text-center">
          数据来源: Finlogix Financial Services | 最后更新: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FinancialInfoModule;