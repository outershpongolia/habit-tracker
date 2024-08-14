import React, { useContext, useMemo } from "react"
import './TrackerList.scss'
import { ITracker } from "../../../interfaces"
import { TrackerListItem } from "../TrackerListItem/TrackerListItem"
import { CustomSelect, ISelectOption } from "../../../components/CustomSelect/CustomSelect"
import { TrackerContext } from "../../../context/TrackerContext"

interface ITrackerListProps {
  trackers: ITracker[]
  onClick: (id: string) => void
}

export const TrackerList: React.FC<ITrackerListProps> = ({ trackers, onClick }) => {
  const {categories} = useContext(TrackerContext)

  const selectCategoryOptions = useMemo(() => {
    return categories.map(x => {
      return {
        value: x.value,
        label: x.value
      } as ISelectOption
    })
  }, [categories])

  return (
    <div className="tracker-list">
      <div className="tracker-list__header">
        <CustomSelect
          options={[
            { value: 'dateUpdated', label: 'Last updated' },
            { value: 'dateCreated', label: 'Date created' }
          ]}
          placeholder="Sort by"
          onChange={(value: string, option: ISelectOption | ISelectOption[]) => {
            console.log({value}, {option})
          }}
        />

        <CustomSelect
          options={selectCategoryOptions}
          placeholder='Select category'
          onChange={(value: string, option: ISelectOption | ISelectOption[]) => {
            console.log({value}, {option})
          }}
        />
      </div>

      <div className="tracker-list__list">
        {trackers.map(tracker => {
          return (
            <TrackerListItem
              key={tracker.id}
              id={tracker.id}
              name={tracker.name}
              description={tracker.description}
              dateUpdated={tracker.dateUpdated}
              dateRange={tracker.timeFormatOptions}
              onClick={onClick}
            />
          )
        })}
      </div>
    </div>
  )
}