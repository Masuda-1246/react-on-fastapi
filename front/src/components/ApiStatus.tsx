interface ApiStatusProps {
  status?: {
    data: {
      status: string;
    }
  };
}

const ApiStatus = ({ status }: ApiStatusProps) => {
  return (
    <div className="card">
      <h2>FastAPI バックエンド状態</h2>
      {status && <p style={{ color: 'green' }}>APIステータス: {status.data.status}</p>}
    </div>
  )
}

export default ApiStatus 