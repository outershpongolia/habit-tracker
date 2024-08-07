import React, { useCallback, useContext } from "react"
import './CreateTracker.scss'
import { generateStep } from "../../utilities"
import { Stepper } from "../../components/Stepper/Stepper"
import { GeneralInfoStep } from "./GeneralInfoStep/GeneralInfoStep"
import { TimeFormatStep } from "./TimeFormatStep/TimeFormatStep"
import { HabitListStep } from "./HabitListStep/HabitListStep"
import { TrackerContext } from "../../context/TrackerContext"
import { PreviewStep } from "./PreviewStep/PreviewStep"
import { useNavigate } from "react-router-dom"
import { TimeRangeStep } from "./TimeRangeStep/TimeRangeStep"
import { LegendStep } from "./LegendStep/LegendStep"
import { UserContext } from "../../context/UserContext"
import { addNewTracker } from "../../api/tracker"

interface ICreateTrackerProps {}

export const CreateTracker: React.FC<ICreateTrackerProps> = () => {
  const {user} = useContext(UserContext)
  const {currentTracker} = useContext(TrackerContext)

  const navigate = useNavigate()

  const handleSubmitTracker = useCallback(async () => {
    if (!user) return null
    
    await addNewTracker({...currentTracker, userId: user.id})
      .then(() => console.log('Success'))
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => navigate(0))
  }, [navigate, user, currentTracker])

  return (
    <div className="create-tracker">
      <Stepper
        steps={[
          generateStep('General Info', <GeneralInfoStep />),
          generateStep('Time Format', <TimeFormatStep />),
          generateStep('Time Range', <TimeRangeStep />),
          generateStep('Habit List', <HabitListStep />),
          generateStep('Legend', <LegendStep />),
          generateStep('Preview', <PreviewStep />),
        ]}
        onSubmitStepper={handleSubmitTracker}
      />
    </div>
  )
}