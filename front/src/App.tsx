import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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
  }, [])

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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      {/* FastAPIの状態表示 */}
      <div className="card">
        <h2>FastAPI バックエンド状態</h2>
        {apiStatus && <p style={{ color: 'green' }}>APIステータス: {apiStatus}</p>}
        {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
