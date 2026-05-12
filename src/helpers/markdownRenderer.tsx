import { CodeBlock } from "components/blog/codeBlock";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./blog.css";

interface MarkdownRendererProps {
  markdownContent: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const MarkdownRenderer = ({ markdownContent }: MarkdownRendererProps) => {
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const items: TocItem[] = []
    let match
    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const level = match[1].length
      const text = match[2]
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      items.push({ id, text, level })
    }
    setToc(items)
  }, [markdownContent])

  const headingId = (children: React.ReactNode) =>
    String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

  return (
    <div className="blog-container">
      <div className="markdown-renderer blog-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }: any) {
              return !inline
                ? <CodeBlock className={className}>{children}</CodeBlock>
                : <code className="inline-code">{children}</code>
            },
            h1: ({ children }) => <h1 id={headingId(children)}>{children}</h1>,
            h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
            h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      {toc.length > 0 && (
        <aside className="blog-toc-fixed">
          <h4>En este artículo</h4>
          <ul>
            {toc.map((item) => (
              <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 12}px` }}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

export default MarkdownRenderer
