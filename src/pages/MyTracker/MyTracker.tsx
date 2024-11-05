import React, { useCallback, useContext } from "react"
import './MyTracker.scss'
import { Tracker } from "../../components/Tracker/Tracker"
import { Button } from "../../components/Button/Button"
import { updateTracker } from "../../api/tracker"
import { TrackerContext } from "../../context/TrackerContext"
import { EStatus } from "../../constants"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../context/AlertContext"
import { Header } from "../../components/Header/Header"

interface IMyTrackerProps {}

export const MyTracker: React.FC<IMyTrackerProps> = () => {
  const { handleToast } = useContext(AlertContext)
  const {currentTracker} = useContext(TrackerContext)

  const navigate = useNavigate()

  const handleUpdateTracker = useCallback(() => {
    updateTracker(currentTracker)
      .then(() => {
        handleToast(EStatus.SUCCESS, "Tracker is edited successfully.")
      })
      .catch(console.error)
      .finally(() => navigate(0))
  }, [currentTracker, handleToast, navigate])

  return (
    <div className="my-tracker page">
      <Header
        label={currentTracker.name}
      >
        <Button
          label="save changes"
          variety="secondary"
          onClick={handleUpdateTracker}
        />
      </Header>

      <Tracker />
    </div>
  )
}