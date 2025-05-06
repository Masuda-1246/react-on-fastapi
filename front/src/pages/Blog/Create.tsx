import { FC, useState } from 'react';
import { useCreateBlogPostApiBlogPost } from '../../api/generated/fastAPIReactBackend';
import { BlogPostCreate } from '../../api/model';

const BlogCreatePage: FC = () => {
  // フォームの状態 - BlogPostCreate型に合わせたフィールドのみにする
  const [formData, setFormData] = useState<BlogPostCreate>({
    title: '',
    content: '',
    author: ''
  });

  // エラーメッセージ
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // createMutationを使用してブログ投稿を作成
  const createMutation = useCreateBlogPostApiBlogPost(
    {
      mutation: {
        onSuccess: () => {
          window.location.href = '/blog';
        },
        onError: (error) => {
          setErrorMessage('投稿の作成に失敗しました。もう一度お試しください。');
          console.error('投稿作成エラー:', error);
        }
      }
    }
  );
  
  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 簡易バリデーション
    if (!formData.title.trim()) {
      setErrorMessage('タイトルを入力してください');
      return;
    }
    
    if (!formData.content.trim()) {
      setErrorMessage('内容を入力してください');
      return;
    }

    if (!formData.author.trim()) {
      setErrorMessage('著者を入力してください');
      return;
    }
    
    try {
      setErrorMessage(null);
      
      // createMutationを使用してAPIを呼び出す - データをdata:オブジェクトとして渡す
      createMutation.mutate({ data: formData });
      
    } catch {
      // エラー処理はmutationのonErrorで行う
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">新規ブログ投稿作成</h1>
          <a 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            投稿一覧に戻る
          </a>
        </div>
        
        {/* エラーメッセージ */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{errorMessage}</p>
          </div>
        )}
        
        {/* ブログ投稿フォーム - 必要なフィールドのみに簡略化 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* タイトル */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="投稿タイトルを入力"
                required
              />
            </div>
            
            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="投稿内容を入力"
                required
              />
            </div>
            
            {/* 著者 */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                著者 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="著者名を入力"
                required
              />
            </div>
            
            {/* 送信ボタン */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => window.location.href = '/blog'}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {createMutation.isPending ? '保存中...' : '保存する'}
              </button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default BlogCreatePage; 