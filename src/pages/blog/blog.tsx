import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Blog</h1>
      <button onClick={() => navigate('/blogpost')}>BLOGPOST</button>
    </div>
  );
};

export default Blog;