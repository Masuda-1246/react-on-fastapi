import { FC, useState } from 'react';
import { useDeleteBlogPostApiBlogPostIdDelete, useGetAllBlogPostsApiBlogGet } from '../../api/generated/fastAPIReactBackend';
import { BlogPost } from '../../api/model';

const BlogListPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'
  
  // ブログ投稿のデータを取得
  const { data: blogPostsResponse, isLoading, error } = useGetAllBlogPostsApiBlogGet();
  
  // 検索とフィルタリングを適用
  const filteredPosts = blogPostsResponse?.data?.filter(post => {
    // 検索条件
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // ステータスフィルターは一時的に削除（実際のAPIにstatusプロパティがないため）
    return matchesSearch;
  });

  const deleteMutation = useDeleteBlogPostApiBlogPostIdDelete(
    {
      mutation: {
        onSuccess: () => {
          window.location.href = '/blog';
        }
      }
    }
  );
  
  // 投稿を削除する関数（実際はAPI呼び出し）
  const handleDeletePost = (postId: string) => {
    if (window.confirm('この投稿を削除してもよろしいですか？')) {
      console.log('投稿を削除:', postId);
      deleteMutation.mutate({ postId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ブログ投稿一覧</h1>
          <a 
            href="/blog/create" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            新規投稿
          </a>
        </div>
        
        {/* 検索とフィルター */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="タイトル、内容、著者で検索..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div>
            <select
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">すべてのステータス</option>
              <option value="published">公開済み</option>
              <option value="draft">下書き</option>
            </select>
          </div>
        </div>
        
        {/* ブログ投稿一覧 */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>エラーが発生しました: {error.message}</p>
          </div>
        ) : filteredPosts && filteredPosts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">投稿が見つかりませんでした</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">著者</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新日</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts && filteredPosts.map((post: BlogPost) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">{post.content.substring(0, 50)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.updated_at || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <a href={`/blog/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900">編集</a>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            削除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
  );
};

export default BlogListPage;