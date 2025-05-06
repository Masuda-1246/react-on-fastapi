import { useState } from 'react'
import { useGetAllBlogPostsApiBlogGet, useHealthCheckApiHealthGet } from './api/generated/fastAPIReactBackend'


function App() {
  
  // ブログ関連の状態
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const { data: blogPosts, isLoading, error } = useGetAllBlogPostsApiBlogGet()
  const { data: apiStatus } = useHealthCheckApiHealthGet()

  const createBlogPost = () => {
    console.log('createBlogPost')
  }

  return (
    <>
      <h1>Vite + React on FastAPI</h1>
      
      <div className="card">
        <h2>FastAPI バックエンド状態</h2>
        {apiStatus && <p style={{ color: 'green' }}>APIステータス: {apiStatus.data.status}</p>}
      </div>
      
      <div className="card">
        <h2>新しいブログ記事を作成</h2>
        <form onSubmit={createBlogPost} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px' }}
          />
          <textarea
            placeholder="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '8px', minHeight: '100px' }}
          />
          <input
            type="text"
            placeholder="著者"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ padding: '8px' }}
          />
          <button type="submit" disabled={isLoading} style={{ padding: '8px' }}>
            {isLoading ? '送信中...' : '作成'}
          </button>
        </form>
      </div>
      
      <div className="card">
        <h2>ブログ記事一覧</h2>
        {error && <p style={{ color: 'red' }}>エラー: {error.message}</p>}
        {isLoading ? (
          <p>読み込み中...</p>
        ) : blogPosts?.data && blogPosts.data.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {blogPosts.data.map((post) => (
              <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8em', color: '#666' }}>
                  <span>著者: {post.author}</span>
                  <span>作成日: {new Date(post.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>記事がありません。新しい記事を作成してください。</p>
        )}
      </div>
    </>
  )
}

export default App
