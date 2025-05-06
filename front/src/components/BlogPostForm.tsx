import { useState } from 'react'

interface BlogPostFormProps {
  onSubmit: (title: string, content: string, author: string) => void;
  isLoading: boolean;
}

const BlogPostForm = ({ onSubmit, isLoading }: BlogPostFormProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(title, content, author)
  }

  return (
    <div className="card">
      <h2>新しいブログ記事を作成</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
  )
}

export default BlogPostForm 