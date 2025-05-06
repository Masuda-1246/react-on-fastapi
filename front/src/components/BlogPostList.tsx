import { BlogPost } from "../api/model";

interface BlogPostListProps {
  blogPosts: BlogPost[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const BlogPostList = ({ blogPosts, isLoading, error }: BlogPostListProps) => {
  return (
    <div className="card">
      <h2>ブログ記事一覧</h2>
      {error && <p style={{ color: 'red' }}>エラー: {error.message}</p>}
      {isLoading ? (
        <p>読み込み中...</p>
      ) : blogPosts && blogPosts.length > 0 ? (
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
  )
}

export default BlogPostList 