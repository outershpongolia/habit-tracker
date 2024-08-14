import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import './Dashboard.scss'
import { DEFAULT_TRACKER, ERoute, SORT_BY_OPTIONS } from '../../constants'
import { TrackerContext } from '../../context/TrackerContext'
import { getTrackers } from '../../api/tracker'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Button } from '../../components/Button/Button'
import { CustomSelect, ISelectOption } from '../../components/CustomSelect/CustomSelect'
import { DashboardList } from './DashboardList/DashboardList'
import { TrackerListItem } from './TrackerListItem/TrackerListItem'
import { ProgressListItem } from './ProgressListItem/ProgressListItem'
import { getPercentageFromDaysDifference } from '../../utilities'
import { sortBy } from 'lodash'

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  const {user} = useContext(UserContext)
  const {setCurrentTracker, setTrackersArray, trackersArray, categories} = useContext(TrackerContext)

  const [isLoading, setIsLoading] = useState(false)
  const [sortProgress, setSortProgress] = useState('descending')

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    setIsLoading(true)

    getTrackers({ userId: user.id })
      .then(res => {
        setTrackersArray(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => setIsLoading(false))

    setCurrentTracker(DEFAULT_TRACKER)
  }, [setCurrentTracker, user, setTrackersArray, setIsLoading, categories])

  const handleNavigateToTracker = useCallback((id: string) => {
    const targetTracker = trackersArray.find(x => x.id === id)

    if (!targetTracker) return

    setCurrentTracker(targetTracker)

    navigate(`${ERoute.EDIT_TRACKER}/${targetTracker.id}`, {state: {id: targetTracker.id}});
  }, [trackersArray, navigate, setCurrentTracker])

  const handleNavigateToPage = useCallback(() => {
    navigate(ERoute.CREATE_TRACKER)
  }, [navigate])

  const selectCategoryOptions = useMemo(() => {
    return categories.map(x => {
      return {
        value: x.value,
        label: x.value
      } as ISelectOption
    })
  }, [categories])

  const trackerListItems = useMemo(() => {
    return (
      <Fragment>
        {trackersArray.map(tracker => {
          return (
            <TrackerListItem
              key={tracker.id}
              id={tracker.id}
              name={tracker.name}
              description={tracker.description}
              dateUpdated={tracker.dateUpdated}
              dateRange={tracker.timeFormatOptions}
              onClick={handleNavigateToTracker}
            />
          )
        })}
      </Fragment>
    )
  }, [trackersArray, handleNavigateToTracker])

  const progressListItems = useMemo(() => {
    const sortedTrackers = sortBy(trackersArray, (tracker) => {
      return getPercentageFromDaysDifference(tracker.timeFormatOptions.startDate, tracker.timeFormatOptions.endDate, tracker.timeData.length)
    })

    const sortedTrackersByOption = sortProgress === 'descending' ? sortedTrackers.reverse() : sortedTrackers

    return (
      <Fragment>
        {sortedTrackersByOption.map((tracker, index) => {
          return (
            <ProgressListItem
              key={tracker.id}
              index={index + 1}
              name={tracker.name}
              progress={getPercentageFromDaysDifference(
                tracker.timeFormatOptions.startDate,
                tracker.timeFormatOptions.endDate,
                tracker.timeData.length
              )}
            />
          )
        })}
      </Fragment>
    )
  }, [trackersArray, sortProgress])

  return (
    <div className='dashboard page'>
      <Header
        label={`Hi ${user?.name}!`}
      >
        <Button
          label="Create tracker"
          onClick={handleNavigateToPage}
        />
      </Header>

      <div className='dashboard__main'>
        <DashboardList
          className='dashboard__trackers'
          title='my trackers'
          listItems={trackerListItems}
          isLoading={isLoading}
        >
          <CustomSelect
            options={SORT_BY_OPTIONS}
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
        </DashboardList>

        <DashboardList
          className='dashboard__progress'
          title="progress summary"
          listItems={progressListItems}
          isLoading={isLoading}
        >
          <CustomSelect
            options={SORT_BY_OPTIONS}
            placeholder="Sort by"
            onChange={(value: string, option: ISelectOption | ISelectOption[]) => {
              // TO DO: make this better
              setSortProgress(value)
            }}
          />
        </DashboardList>
      </div>
    </div>
  )
}