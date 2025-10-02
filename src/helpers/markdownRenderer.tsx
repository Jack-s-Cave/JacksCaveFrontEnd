import React from "react";
import './blog.css';

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {

  React.useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-btn");
    buttons.forEach(btn => {
      btn.onclick = () => {
        // Decodificar las entidades HTML del atributo data-code
        const encodedCode = btn.dataset.code || "";
        const textarea = document.createElement('textarea');
        textarea.innerHTML = encodedCode;
        const code = textarea.value;
        
        navigator.clipboard.writeText(code);
        btn.textContent = "✓ Copiado";
        setTimeout(() => (btn.textContent = "Copiar"), 2000);
      };
    });
  }, [markdownContent]);

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const parseMarkdown = (md: string): string => {
    let html = md.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Code blocks first (to avoid interfering with other patterns)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      const trimmedCode = code.trim();
      const escaped = escapeHtml(trimmedCode);
      // Para data-code, necesitamos escapar las comillas para que funcione en el atributo HTML
      const dataCode = trimmedCode.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const language = lang || 'code';
      
      return `
        <div class="code-block-wrapper">
          <div class="code-header">
            <span class="code-language">${language}</span>
            <button class="copy-btn" data-code="${dataCode}">Copiar</button>
          </div>
          <pre><code class="language-${language}">${escaped}</code></pre>
        </div>
      `;
    });
    
    // Inline code (after code blocks)
    html = html.replace(/`([^`\n]+)`/gim, '<code class="inline-code">$1</code>');
    
    // Headers (in order from most specific to least)
    html = html.replace(/^######\s+(.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.*$)/gim, '<h1>$1</h1>');
    
    // Blockquotes (before other line-based parsing)
    html = html.replace(/^>\s*(.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Bold and italic (more specific patterns first)
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Images (before links to avoid conflicts)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="markdown-image" />');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="markdown-link">$1</a>');
    
    // Lists - Handle multiple consecutive items
    html = processLists(html);
    
    // Horizontal rules
    html = html.replace(/^---+$/gim, '<hr>');
    html = html.replace(/^\*\*\*+$/gim, '<hr>');
    
    // Line breaks and paragraphs
    html = processParagraphs(html);
    
    return html;
  };
  
  const processLists = (html: string): string => {
    // Unordered lists
    html = html.replace(/(^[\s]*[-+*]\s+.*$\n?)+/gim, (match) => {
      const items = match
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[\s]*[-+*]\s+/, ''))
        .map(item => `<li>${item}</li>`)
        .join('');
      return `<ul>${items}</ul>`;
    });
    
    // Ordered lists
    html = html.replace(/(^[\s]*\d+\.\s+.*$\n?)+/gim, (match) => {
      const items = match
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[\s]*\d+\.\s+/, ''))
        .map(item => `<li>${item}</li>`)
        .join('');
      return `<ol>${items}</ol>`;
    });
    
    return html;
  };
  
  const processParagraphs = (html: string): string => {
    // Split by double newlines to identify paragraph breaks
    const blocks = html.split('\n\n');
    
    return blocks
      .map(block => {
        block = block.trim();
        if (!block) return '';
        
        // Don't wrap block elements in paragraphs
        if (block.match(/^<(h[1-6]|blockquote|pre|ul|ol|hr|div|img)/)) {
          return block;
        }
        
        // Convert single line breaks to <br> within paragraphs
        block = block.replace(/\n/g, '<br>');
        
        return `<p>${block}</p>`;
      })
      .filter(block => block)
      .join('\n');
  };

  return (
    <div
      className="markdown-renderer blog-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(markdownContent) }}
    />
  );
};

export default MarkdownRenderer;