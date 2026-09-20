import MarkdownRenderer from '../../helpers/markdownRenderer';
import './blogpost.css';
import { IoShareSocial } from "react-icons/io5";
import NavBar from '../../components/navbar/navbar';
import { useParams } from 'react-router-dom'
import { useBlogById } from 'hooks/useBlogs';
import ErrorMessage from 'components/common/errorMessage';
import Spinner from 'components/common/spinner';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const { blog, loading, error } = useBlogById(Number(id))

  if (loading) return <main><NavBar /><Spinner size="large" /></main>
  if (error) return <main><NavBar /><ErrorMessage /></main>
  if (!blog) return null

  return (
    <main>
      <NavBar />
      <div className='blog-post'>

        {/* Contenido Markdown */}
        <div className='blogpost-container'>
          <div className='blog-header'>
            <h1 className='blog-title'>{blog.title}</h1>
            <div className='header-info'>
              <div className='author-info'>
                <img 
                  src="https://images.icon-icons.com/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png" 
                  alt={blog.author}
                  className="author-avatar"
                />
                <p><strong>{blog.author}</strong> • {blog.date}</p>
              </div>
              <div className='share-section'>
                <button className="share-btn"><IoShareSocial /> Share</button>
              </div>
            </div>
          </div>
          <MarkdownRenderer markdownContent={blog.content} />
        </div>

        {/* Autor */}
        <div className='blogpost-subsection'>
          <div className='blogpost-subsection-header'>
            <h1>Escrito por {blog.author}</h1>
          </div>
          <div className='by-author-section'>
            {/* TODO: posts del mismo autor */}
          </div>
        </div>

        {/* Otros Posts */}
        <div className='blogpost-subsection'>
          <div className='blogpost-subsection-header'>
            <h1>Otros Posts interesantes</h1>
          </div>
          <div className='interesting-section'>
            {/* TODO: posts relacionados */}
          </div>
        </div>

      </div>
    </main>
  );
};

export default BlogPost;
