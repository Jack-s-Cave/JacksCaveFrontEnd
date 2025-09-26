import React, { useEffect, useState } from 'react';
import MarkdownRenderer from '../../helpers/markdownRenderer';
import './blogpost.css';

const BlogPost: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/test_blogpost/blog.md')
      .then(res => res.text())
      .then(setContent)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='blog-post'>
        <div className='blog-container' style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <MarkdownRenderer markdownContent={content}/>
        </div>
    </div>
  );
};

export default BlogPost;
