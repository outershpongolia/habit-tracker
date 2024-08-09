import React, { useCallback, useContext } from "react"
import './EditTracker.scss'
import { Tracker } from "../../components/Tracker/Tracker"
import { Button } from "../../components/Button/Button"
import { editTracker } from "../../api/tracker"
import { TrackerContext } from "../../context/TrackerContext"
import { EStatus } from "../../constants"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../context/AlertContext"

interface IEditTrackerProps {}

export const EditTracker: React.FC<IEditTrackerProps> = () => {
  const { handleToast } = useContext(AlertContext)
  const {currentTracker} = useContext(TrackerContext)

  const navigate = useNavigate()

  const handleEditTracker = useCallback(() => {
    editTracker(currentTracker)
      .then(() => {
        handleToast(EStatus.SUCCESS, "Tracker is edited successfully.")
      })
      .catch(console.error)
      .finally(() => navigate(0))
  }, [currentTracker, handleToast, navigate])

  return (
    <div className="edit-tracker">
      <Tracker />

      <Button
        label="submit changes"
        onClick={handleEditTracker}
      />
    </div>
  )
}