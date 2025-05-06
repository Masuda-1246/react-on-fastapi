import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SidebarProps = {
  children?: ReactNode;
  isOpen?: boolean;
};

const Sidebar: FC<SidebarProps> = ({ children, isOpen = true }) => {
  const location = useLocation();
  
  // 現在のパスに基づいてアクティブなリンクをハイライト表示
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // ナビゲーションリンク
  const navLinks = [
    // { path: '/', label: 'ホーム', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    // { path: '/dashboard', label: 'ダッシュボード', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/blog', label: 'ブログ管理', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { path: '/blog/create', label: '新規投稿', icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];
  
  return (
    <div 
      className={`w-64 bg-white shadow-md h-full overflow-y-auto transform transition-all duration-300 ease-in-out fixed z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        {children || (
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition duration-150 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mr-3 h-5 w-5 ${
                    isActive(link.path) ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={link.icon}
                  />
                </svg>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 