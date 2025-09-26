import React from "react";
import './blog.css';

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {
  const parseMarkdown = (md: string): string => {
    // Normalize line endings and trim
    let html = md.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Code blocks first (to avoid interfering with other patterns)
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/gim, (match, lang, code) => {
      const escaped = escapeHtml(code.trim());
      const language = lang ? ` class="language-${lang}"` : '';
      
      return `
        <div class="code-block-wrapper">
          <button class="copy-btn" data-code="${escaped}">Copy</button>
          <pre><code${language}>${escaped}</code></pre>
        </div>
      `;
    });
    
  
    // Inline code (after code blocks)
    html = html.replace(/`([^`\n]+)`/gim, '<code>$1</code>');
    
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

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Lists - Handle multiple consecutive items
    html = processLists(html);
    
    // Horizontal rules
    html = html.replace(/^---+$/gim, '<hr>');
    html = html.replace(/^\*\*\*+$/gim, '<hr>');
    
    // Line breaks and paragraphs
    html = processParagraphs(html);
    
    return html;
  };
  
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
        if (block.match(/^<(h[1-6]|blockquote|pre|ul|ol|hr)/)) {
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
      style={{
        lineHeight: "1.6",
        fontSize: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#333",
        maxWidth: "100%"
      }}
      dangerouslySetInnerHTML={{ __html: parseMarkdown(markdownContent) }}
    />
  );
};

export default MarkdownRenderer;