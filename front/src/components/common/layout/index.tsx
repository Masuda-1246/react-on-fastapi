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
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen}>{sidebarContent}</Sidebar>
        <div 
          className={`flex-1 overflow-auto p-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-0' : 'ml-0 md:pl-0'
          }`}
          style={{ 
            width: '100%',
            transitionProperty: 'margin, padding',
          }}
        >
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
