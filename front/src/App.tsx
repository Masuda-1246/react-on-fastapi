import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// ブログ記事の型定義
interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  updated_at: string
}

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // ブログ関連の状態
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // FastAPIのヘルスチェックエンドポイントを呼び出す
    fetch('/api/health')
      .then(response => {
        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setApiStatus(data.status)
        setError(null)
      })
      .catch(err => {
        console.error('API呼び出しエラー:', err)
        setError(err.message)
        setApiStatus(null)
      })
    
    // ブログ記事を取得
    fetchBlogPosts()
  }, [])
  
  // ブログ記事を取得する関数
  const fetchBlogPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/blog')
      if (!response.ok) {
        throw new Error('ブログ記事の取得に失敗しました!')
      }
      const data = await response.json()
      setBlogPosts(data)
    } catch (err) {
      console.error('ブログ記事の取得エラー:', err)
      setError(err instanceof Error ? err.message : '未知のエラー')
    } finally {
      setIsLoading(false)
    }
  }
  
  // ブログ記事を作成する関数
  const createBlogPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !author) {
      setError('すべてのフィールドを入力してください')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author }),
      })
      
      if (!response.ok) {
        throw new Error('ブログ記事の作成に失敗しました')
      }
      
      // フォームをリセット
      setTitle('')
      setContent('')
      setAuthor('')
      
      // 記事一覧を更新
      await fetchBlogPosts()
      
      setError(null)
    } catch (err) {
      console.error('ブログ記事の作成エラー:', err)
      setError(err instanceof Error ? err.message : '未知のエラー')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + FastAPI</h1>
      
      {/* FastAPIの状態表示 */}
      <div className="card">
        <h2>FastAPI バックエンド状態</h2>
        {apiStatus && <p style={{ color: 'green' }}>APIステータス: {apiStatus}</p>}
        {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      </div>
      
      {/* ブログ記事作成フォーム */}
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
      
      {/* ブログ記事一覧 */}
      <div className="card">
        <h2>ブログ記事一覧</h2>
        {isLoading ? (
          <p>読み込み中...</p>
        ) : blogPosts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {blogPosts.map((post) => (
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
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
