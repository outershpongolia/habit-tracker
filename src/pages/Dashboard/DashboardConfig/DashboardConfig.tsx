import React, { useCallback, useContext, useState } from "react"
import './DashboardConfig.scss'
import { convertDate } from "../../../utilities"
import { DateSelect } from "../../../components/DateSelect/DateSelect"
import { Button } from "../../../components/Button/Button"
import { TrackerContext } from "../../../context/TrackerContext"
import { useNavigate } from "react-router-dom"
import { Tracker } from "../../../components/Tracker/Tracker"

interface IDashboardConfigProps {}

// TO DO:
// generate will contain api call that will save tracker

export const DashboardConfig: React.FC<IDashboardConfigProps> = () => {
  const {tracker, setTracker} = useContext(TrackerContext)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [openPreview, setOpenPreview] = useState(false)

  const navigate = useNavigate()

  const handleChangeStartDay = useCallback((date: Date) => {
    setStartDate(date)
  }, [])

  const handleChangeEndDay = useCallback((date: Date) => {
    setEndDate(date)
  }, [])

  const handlePreviewTracker = useCallback(() => {
    setTracker({
      startDate: convertDate(startDate),
      endDate: convertDate(endDate)
    })

    setOpenPreview(true)
  }, [startDate, endDate, setTracker])

  const handleGenerateTracker = useCallback(() => {
    // throw some api call and a toast for success
    // e.g. update user trackers database with new <tracker>
    setOpenPreview(false)
  }, [])

  const handleNavigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="dashboard-config">
      <div className="dashboard-config__settings dashboard-config__section">
        {/* Tracker Settings */}
        <DateSelect
          startDate={startDate}
          endDate={endDate}
          handleChangeStartDay={handleChangeStartDay}
          handleChangeEndDay={handleChangeEndDay}
        />

        <Button
          label='Preview'
          onClick={handlePreviewTracker}
        />

        <Button
          label='Generate'
          onClick={handleGenerateTracker}
        />

        <Button
          label='Cancel'
          onClick={handleNavigateBack}
        />
      </div>

      <div className="dashboard-config__section">
        {/* Tracker Preview */}
        {openPreview && (
          <Tracker data={tracker} />
        )}
      </div>
    </div>
  )
}