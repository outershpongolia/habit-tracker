import React, { useCallback } from "react"
import './TrackerStamp.scss'
import { GiTargetPrize } from "react-icons/gi";

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
      <div className="tracker-stamp__info">
        <div className="tracker-stamp__name">{name}</div>
        {description && <div className="tracker-stamp__description">{description}</div>}
      </div>

      <div className="tracker-stamp__score">
        <GiTargetPrize className="tracker-stamp__icon" />

        <div className="tracker-stamp__data">
          <div className="tracker-stamp__number">111</div>
          <div className="tracker-stamp__text">days left</div>
        </div>
      </div>
    </div>
  )
}