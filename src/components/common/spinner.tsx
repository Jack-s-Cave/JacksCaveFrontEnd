import './spinner.css'

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

const Spinner = ({ size = 'medium' }: SpinnerProps) => {
  return (
    <div className={`spinner-wrapper spinner-${size}`}>
      <div className="spinner" />
    </div>
  )
}

export default Spinner
