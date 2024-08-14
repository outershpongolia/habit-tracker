import React, { useCallback } from "react"
import './TrackerListItem.scss'
import { IDateRange } from "../../../interfaces"

interface ITrackerListItemProps {
  id: string
  name: string
  dateUpdated: Date
  dateRange: IDateRange
  onClick: (id: string) => void
  description?: string
}

export const TrackerListItem: React.FC<ITrackerListItemProps> = ({ id, name, onClick, description, dateUpdated, dateRange }) => {
  const handleOnClick = useCallback(() => {
    onClick(id)
  }, [onClick, id])

  return (
    <div
      className="tracker-list-item"
      onClick={handleOnClick}
    >
      <div className="tracker-list-item__date">
        <span className="tracker-list-item__subtext tracker-list-item__subtext_color">
          {new Date().toLocaleString('default', { weekday: 'long' }).slice(0, 3)}
        </span>
        <span className="tracker-list-item__subtext tracker-list-item__subtext_color">
          {new Date(dateUpdated).getDate()}
        </span>
      </div>

      <div className="tracker-list-item__data">
        <div className="tracker-list-item__section"> 
          <div className="tracker-list-item__text">{name}</div>

          {description && <div className="tracker-list-item__subtext">{description}</div>}
        </div>

        <div className="tracker-list-item__section">
          <div className="tracker-list-item__category">
            <span className="tracker-list-item__subtext tracker-list-item__subtext_color">
              ongoing {/* TO DO: change this to category */}
            </span>
          </div>
          <div className="tracker-list-item__subtext">
            {new Date(dateRange.startDate || '').toLocaleDateString('en-US').toString()}
            -
            {new Date(dateRange.endDate || '').toLocaleDateString('en-US').toString()}
          </div>
        </div>
      </div>
    </div>
  )
}