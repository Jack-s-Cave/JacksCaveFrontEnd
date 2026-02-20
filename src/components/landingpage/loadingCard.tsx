import './loadingCard.css'

interface LoadingCardProps {
  className?: string
}

const LoadingCard: React.FC<LoadingCardProps> = ({ className = '' }) => {
  return (
    <div className={`loading-card ${className}`}>
      <div className="loading-image" />
      <div className="loading-text title" />
      <div className="loading-text subtitle" />
      <div className="loading-tags">
        <div className="loading-tag" />
        <div className="loading-tag" />
        <div className="loading-tag" />
      </div>
    </div>
  )
}

export default LoadingCard
