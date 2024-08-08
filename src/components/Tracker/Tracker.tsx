import React, { useCallback, useContext, useState } from "react"
import './Tracker.scss'
import { TrackerContext } from "../../context/TrackerContext"
import Calendar from "react-calendar"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown"
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ITimeData } from "../../interfaces";
import { TrackerLegend } from "./TrackerLegend/TrackerLegend";

interface ITrackerProps {}

export const Tracker: React.FC<ITrackerProps> = () => {
  const {currentTracker} = useContext(TrackerContext)

  const [timeData, setTimeData] = useState<ITimeData[]>([])

  const handleChangeStatus = useCallback((status: string, color: string, date: number) => {
    setTimeData(timeData => {
      const existingDate = timeData.find(x => x.date === date) || null

      return !existingDate
        ? [...timeData, {status, color, date}]
        : timeData.map(x => x.date === date ? {...x, status, color} : x)
    })
  }, [setTimeData])

  const handleTileContent = useCallback(({ date, view }: { date: Date; view: string }) => {
    const dropdownItemsArray = currentTracker.legend.map(x => {
      if (!x.selected) return null

      return {
        key: x.id,
        label: (
          <div
            onClick={() => handleChangeStatus(x.status, x.color, date.getTime())}
          >
            {x.status}
          </div>
        ),
        icon: (
          <div
            className="tracker__color-circle"
            style={{ backgroundColor: x.color }}
          />
        )
      }
    })

    return (
      <CustomDropdown
        items={dropdownItemsArray as ItemType[]}
        disabled={false}
      />
    )
  }, [currentTracker, handleChangeStatus])

  const handleTileClassName = useCallback(({date} : {date: Date}) => {
    const startDate = currentTracker.timeFormatOptions.startDate as Date
    const endDate = currentTracker.timeFormatOptions.endDate as Date

    return date.valueOf() < startDate.valueOf() || endDate.valueOf() < date.valueOf()
      ? 'tracker__tile_disabled'
      : 'tracker__tile'
  }, [currentTracker.timeFormatOptions])

  return (
    <div className="tracker">
      <div className="tracker__title">
        {currentTracker.name}

        {currentTracker.description &&
          <div className="tracker__description">
            {currentTracker.description}
          </div>
        }
      </div>

      <div className="tracker__body">
        <Calendar
          maxDate={currentTracker.timeFormatOptions.endDate as Date}
          minDate={currentTracker.timeFormatOptions.startDate as Date}
          nextLabel={<MdArrowForwardIos className="tracker__arrow" />}
          prevLabel={<MdArrowBackIos className="tracker__arrow" />}
          tileClassName={handleTileClassName}
          tileContent={handleTileContent}
        />
      </div>

      <div className="tracker__habit">
        <span>Tracking:</span> {currentTracker.habits[0]}
      </div>

      <TrackerLegend
        selectedLegend={currentTracker.legend.filter(x => x.selected)}
      />
    </div>
  )
}