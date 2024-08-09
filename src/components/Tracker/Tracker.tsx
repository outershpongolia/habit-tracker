import React, { useCallback, useContext } from "react"
import './Tracker.scss'
import { TrackerContext } from "../../context/TrackerContext"
import { CustomDropdown } from "../CustomDropdown/CustomDropdown"
import { ItemType } from "antd/es/menu/hooks/useItems";
import { TrackerLegend } from "./TrackerLegend/TrackerLegend";
import { TrackerBody } from "./TrackerBody/TrackerBody";

interface ITrackerProps {
  preview?: boolean
}

export const Tracker: React.FC<ITrackerProps> = ({ preview }) => {
  const {currentTracker, setCurrentTracker} = useContext(TrackerContext)

  const handleChangeStatus = useCallback((status: string, color: string, date: number) => {
    if (preview) return

    setCurrentTracker(currentTracker => {
      const alreadyExists = currentTracker.timeData.find(x => x.date === date)

      return {
        ...currentTracker,
        timeData: !alreadyExists
          ? [...currentTracker.timeData, {status, color, date}]
          : currentTracker.timeData.map(x => x.date === date ? {...x, status, color} : x)
      }
    })
  }, [setCurrentTracker, preview])

  const handleTileContent = useCallback(({ date, view }: { date: Date; view: string }) => {
    const tileExists = currentTracker.timeData.find(x => x.date === date.getTime())

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
      <div
        className="tracker__tile-wrapper"
        style={{ backgroundColor: tileExists ? tileExists.color : 'transparent' }}
      >
        <CustomDropdown
          items={dropdownItemsArray as ItemType[]}
          disabled={false}
        />
      </div>
    )
  }, [currentTracker, handleChangeStatus])

  const handleTileClassName = useCallback(({date} : {date: Date}) => {
    const currentDate = date.getTime()
    const startDate = new Date(currentTracker.timeFormatOptions.startDate as Date).getTime()
    const endDate = new Date(currentTracker.timeFormatOptions.endDate as Date).getTime()

    return currentDate < startDate || endDate < currentDate
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

      <TrackerBody
        defaultActiveStartDate={currentTracker.timeFormatOptions.startDate as Date}
        maxDate={currentTracker.timeFormatOptions.endDate as Date}
        minDate={currentTracker.timeFormatOptions.startDate as Date}
        tileClassName={handleTileClassName}
        tileContent={handleTileContent}
      />

      <div className="tracker__habit">
        <span>Tracking:</span> {currentTracker.habits[0]}
      </div>

      <TrackerLegend
        selectedLegend={currentTracker.legend.filter(x => x.selected)}
      />
    </div>
  )
}