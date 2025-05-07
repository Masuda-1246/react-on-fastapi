import { FC, ReactNode, useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';

type LayoutProps = {
  children: ReactNode;
  showSidebar?: boolean;
  sidebarContent?: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, showSidebar: initialShowSidebar = false, sidebarContent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialShowSidebar);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header 
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="relative flex-1 overflow-hidden">
        {/* サイドバー - 絶対配置 */}
        <div 
          className={`absolute top-0 left-0 z-20 h-full ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
        >
          <Sidebar isOpen={true}>{sidebarContent}</Sidebar>
        </div>
        
        {/* メインコンテンツ - 常に左寄せ */}
        <div className="h-full overflow-auto p-6 mx-auto max-w-7xl w-full">
          {children}
        </div>
        
        {/* オーバーレイ（モバイルビュー用） */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
