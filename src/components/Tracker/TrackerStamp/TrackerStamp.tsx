import React, { useCallback } from "react"
import './TrackerStamp.scss'

interface ITrackerStampProps {
  name: string
  description?: string
}

export const TrackerStamp: React.FC<ITrackerStampProps> = ({ name, description }) => {
  const handleNavigateToTracker = useCallback(() => {
    // navigation
  }, [])

  return (
    <div
      className="tracker-stamp"
      onClick={handleNavigateToTracker}
    >
      <div className="tracker-stamp__name">{name}</div>

      {description && <div className="tracker-stamp__description">{description}</div>}
    </div>
  )
}