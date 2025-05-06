import { FC } from 'react';

type HeaderProps = {
  userName?: string;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
};

const Header: FC<HeaderProps> = ({ 
  userName = 'Admin',
  isSidebarOpen = true,
  toggleSidebar
}) => {
  return (
    <header className="flex justify-between items-center h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {toggleSidebar && (
          <button 
            onClick={toggleSidebar} 
            className="p-2 mr-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 transition-transform duration-300 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
        <div className="font-bold text-xl tracking-wider mr-2">
          <span className="text-black">Blog管理ツール</span>
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 mx-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button className="p-2 mx-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
        <div className="flex items-center ml-4">
          <div className="mr-2 text-right">
            <div className="text-sm">{userName}</div>
          </div>
          <button className="ml-1 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
