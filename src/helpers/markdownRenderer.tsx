import React, { useState, useEffect } from "react";
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

const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "code";
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
      <pre><code className={className}>{children}</code></pre>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extraer encabezados del markdown usando Regex
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const level = match[1].length;
      const text = match[2];
      // Crear un ID amigable para URL: "Hola Mundo" -> "hola-mundo"
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      items.push({ id, text, level });
    }
    setToc(items);
  }, [markdownContent]);

  return (
    <div className="blog-container">
      {/* Contenido principal */}
      <div className="markdown-renderer blog-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              return !inline ? (
                <CodeBlock className={className}>{children}</CodeBlock>
              ) : (
                <code className="inline-code" {...props}>{children}</code>
              );
            },
            // Generar IDs para los headers para que el TOC funcione
            h1: ({ children }) => {
              const id = String(children).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
              return <h1 id={id}>{children}</h1>;
            },
            h2: ({ children }) => {
              const id = String(children).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
              return <h2 id={id}>{children}</h2>;
            },
            h3: ({ children }) => {
              const id = String(children).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
              return <h3 id={id}>{children}</h3>;
            },
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
  );
};

export default MarkdownRenderer;