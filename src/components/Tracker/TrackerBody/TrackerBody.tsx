import React from "react"
import './TrackerBody.scss'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import Calendar, { TileClassNameFunc, TileContentFunc } from "react-calendar"

interface ITrackerBodyProps {
  defaultActiveStartDate: Date
  maxDate: Date
  minDate: Date
  tileClassName: string | TileClassNameFunc
  tileContent: React.ReactNode | TileContentFunc
}

export const TrackerBody: React.FC<ITrackerBodyProps> = ({ defaultActiveStartDate, maxDate, minDate, tileClassName, tileContent }) => {
  return (
    <div className="tracker-body">
      <Calendar
        nextLabel={<MdArrowForwardIos className="tracker__arrow" />}
        prevLabel={<MdArrowBackIos className="tracker__arrow" />}
        defaultActiveStartDate={new Date(defaultActiveStartDate)}
        maxDate={new Date(maxDate)}
        minDate={new Date(minDate)}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  )
}