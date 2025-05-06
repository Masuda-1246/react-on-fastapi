import { FC } from 'react';

const DashboardPage: FC = () => {
  // ダッシュボードのデータ（実際はAPIから取得）
  const statsData = {
    totalPosts: 125,
    publishedPosts: 98,
    draftPosts: 27,
    totalViews: 45682,
    totalComments: 1243
  };

  // 最近の統計データ（実際はAPIから取得）
  const recentStats = [
    { id: 1, date: '2023-06-01', views: 234, comments: 12 },
    { id: 2, date: '2023-06-02', views: 256, comments: 18 },
    { id: 3, date: '2023-06-03', views: 321, comments: 25 },
    { id: 4, date: '2023-06-04', views: 198, comments: 11 },
    { id: 5, date: '2023-06-05', views: 276, comments: 15 }
  ];

  return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm">投稿数</h2>
            <div className="flex justify-between items-end mt-2">
              <div className="text-3xl font-bold">{statsData.totalPosts}</div>
              <div className="text-sm text-gray-500">
                公開: {statsData.publishedPosts} / 下書き: {statsData.draftPosts}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm">総閲覧数</h2>
            <div className="flex justify-between items-end mt-2">
              <div className="text-3xl font-bold">{statsData.totalViews}</div>
              <div className="text-sm text-green-500">+12.5%</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-500 text-sm">総コメント数</h2>
            <div className="flex justify-between items-end mt-2">
              <div className="text-3xl font-bold">{statsData.totalComments}</div>
              <div className="text-sm text-green-500">+5.3%</div>
            </div>
          </div>
        </div>
        
        {/* 最近の統計 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">最近の統計</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">閲覧数</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コメント</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentStats.map(stat => (
                  <tr key={stat.id}>
                    <td className="py-3 px-4 whitespace-nowrap">{stat.date}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{stat.views}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{stat.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* クイックアクション */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">クイックアクション</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/blog/create" className="inline-block py-3 px-4 bg-blue-600 text-white font-medium text-center rounded-md hover:bg-blue-700 transition-colors duration-200">
              新規ブログ投稿を作成
            </a>
            <a href="/blog" className="inline-block py-3 px-4 bg-gray-100 text-gray-800 font-medium text-center rounded-md hover:bg-gray-200 transition-colors duration-200">
              投稿一覧を管理
            </a>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage; 