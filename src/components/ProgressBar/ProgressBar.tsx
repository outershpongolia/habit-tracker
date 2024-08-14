import React from "react"
import './ProgressBar.scss'

interface IProgressBarProps {
  progress: number
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{width: `${progress}%`}} />

      <div className="progress-bar__percentage">{Math.floor(progress)}%/100%</div>
    </div>
  )
}