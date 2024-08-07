import React, { useCallback } from "react"
import './TrackerStamp.scss'

interface ITrackerStampProps {
  name: string
  startDate: number | Date | null
  endDate: number | Date | null
  description?: string
}

export const TrackerStamp: React.FC<ITrackerStampProps> = ({ name, startDate, endDate, description }) => {
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

      <div className="tracker-stamp__dates">
        <div className="tracker-stamp__date">
          <span>start:</span> {startDate?.toString().slice(0, 10)}
        </div>
        <div className="tracker-stamp__date">
          <span>end:</span> {endDate?.toString().slice(0, 10)}
        </div>
      </div>
    </div>
  )
}