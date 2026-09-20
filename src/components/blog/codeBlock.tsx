import { useState } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const language = className?.replace('language-', '') || 'code'
  const codeString = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <pre><code className={className}>{children}</code></pre>
    </div>
  )
}
