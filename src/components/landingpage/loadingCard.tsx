import './loadingCard.css'

const LoadingCard = () => {
  return (
    <div className="recent-card loading-card">
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
