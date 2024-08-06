import React, { useCallback, useContext, useState } from "react"
import './Tracker.scss'
import { TrackerContext } from "../../context/TrackerContext"
import Calendar from "react-calendar"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown"
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ITimeData } from "../../interfaces";

interface ITrackerProps {}

export const Tracker: React.FC<ITrackerProps> = () => {
  const {currentTracker} = useContext(TrackerContext)

  const [timeData, setTimeData] = useState<ITimeData[]>([])

  console.log({timeData})

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
            className="tracker__dropdown-icon"
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
          activeStartDate={currentTracker.timeFormatOptions.startDate as Date}
          maxDate={currentTracker.timeFormatOptions.endDate as Date}
          minDate={currentTracker.timeFormatOptions.startDate as Date}
          nextLabel={<MdArrowForwardIos className="tracker__arrow" />}
          prevLabel={<MdArrowBackIos className="tracker__arrow" />}
          tileContent={handleTileContent}
          tileClassName='tracker__tile'
        />
      </div>
    </div>
  )
}