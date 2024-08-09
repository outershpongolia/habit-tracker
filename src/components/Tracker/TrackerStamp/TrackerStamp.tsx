import React, { useCallback } from "react"
import './TrackerStamp.scss'
import { GiTargetPrize } from "react-icons/gi";

interface ITrackerStampProps {
  id: string
  name: string
  onClick: (id: string) => void
  description?: string
}

export const TrackerStamp: React.FC<ITrackerStampProps> = ({ id, name, onClick, description }) => {
  const handleOnClick = useCallback(() => {
    onClick(id)
  }, [onClick, id])

  return (
    <div
      className="tracker-stamp"
      onClick={handleOnClick}
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