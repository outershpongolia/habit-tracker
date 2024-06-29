import React, { useCallback, useContext } from "react"
import './CreateTracker.scss'
import { generateStep } from "../../utilities"
import { Stepper } from "../../components/Stepper/Stepper"
import { GeneralInfoStep } from "./GeneralInfoStep/GeneralInfoStep"
import { TimeFormatStep } from "./TimeFormatStep/TimeFormatStep"
import { ThirdStep } from "./ThirdStep/ThirdStep"
import { TrackerContext } from "../../context/TrackerContext"
import { PreviewStep } from "./PreviewStep/PreviewStep"
import { useNavigate } from "react-router-dom"
import { ERoute } from "../../constants"
import { TimeRangeStep } from "./TimeRangeStep/TimeRangeStep"
import { CreateLegendStep } from "./CreateLegendStep/CreateLegendStep"

interface ICreateTrackerProps {}

export const CreateTracker: React.FC<ICreateTrackerProps> = () => {
  const {tracker} = useContext(TrackerContext)

  const navigate = useNavigate()

  const handleSubmitTracker = useCallback(() => {
    // TO DO: throw some api call and a toast for success
    // e.g. update user trackers database with new <tracker>
    console.log({tracker})
    navigate(ERoute.DASHBOARD)
  }, [tracker, navigate])

  return (
    <div className="create-tracker">
      <Stepper
        steps={[
          generateStep('General Info', <GeneralInfoStep />),
          generateStep('Time Format', <TimeFormatStep />),
          generateStep('Time Range', <TimeRangeStep />),
          generateStep('Habit To Track', <ThirdStep />),
          generateStep('Create Legend', <CreateLegendStep />),
          generateStep('Preview', <PreviewStep />),
        ]}
        onSubmitStepper={handleSubmitTracker}
        hasError={false}
      />
    </div>
  )
}