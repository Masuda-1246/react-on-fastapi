import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogListPage from './pages/Blog';
import BlogCreatePage from './pages/Blog/Create';
import BlogEditPage from './pages/Blog/Edit';
import Layout from './components/common/layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Navigate to="/blog" replace />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/create" element={<BlogCreatePage />} />
            <Route path="/blog/edit/:id" element={<BlogEditPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
