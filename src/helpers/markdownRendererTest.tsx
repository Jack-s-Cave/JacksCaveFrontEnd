import React from "react";
import ReactMarkdown from "react-markdown";
import "./blog.css";

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRendererTest: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {
  return (
    <div
      className="markdown-renderer blog-content"
      style={{
        lineHeight: "1.6",
        fontSize: "16px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#333",
        maxWidth: "100%",
      }}
    >
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRendererTest;
