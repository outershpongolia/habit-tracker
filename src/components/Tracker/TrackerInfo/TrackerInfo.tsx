import React from "react"
import './TrackerInfo.scss'

interface ITrackerInfoProps {
  label: string
  value: string
}

export const TrackerInfo: React.FC<ITrackerInfoProps> = ({ label, value }) => {
  return (
    <div className="tracker-info">
      <div className="tracker-info__label text-description">{label}:</div>
      <div className="tracker-info__value">{value}</div>
    </div>
  )
}