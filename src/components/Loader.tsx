import { useState, useEffect } from 'react';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Hide after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="text-7xl md:text-8xl font-black tracking-tighter">
            <span className="inline-block animate-bounce bg-gradient-to-b from-gray-900 to-blue-700 bg-clip-text text-transparent" style={{ animationDelay: '0s' }}>А</span>
            <span className="inline-block animate-bounce bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>500</span>
          </div>
          
          {/* Loading dots */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm font-medium">Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader;
