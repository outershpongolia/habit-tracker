import React from "react"
import './ProgressListItem.scss'
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar"

interface IProgressListItemProps {
  index: number
  name: string
  progress: number
}

export const ProgressListItem: React.FC<IProgressListItemProps> = ({ index, name, progress }) => {
  return (
    <div className="progress-list-item">
      <div className="progress-list-item__number">{index}</div>

      <div className="progress-list-item__name">{name}</div>

      <div className="progress-list-item__progress">
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}