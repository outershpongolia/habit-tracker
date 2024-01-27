import React, { useCallback } from "react"
import './CreateTracker.scss'
import { generateStep } from "../../utilities"
import { Stepper } from "../../components/Stepper/Stepper"
import { FirstStep } from "./FirstStep/FirstStep"
import { SecondStep } from "./SecondStep/SecondStep"
import { ThirdStep } from "./ThirdStep/ThirdStep"

interface ICreateTrackerProps {}

export const CreateTracker: React.FC<ICreateTrackerProps> = () => {
  const handleSubmitTracker = useCallback(() => {
    // TO DO: throw some api call and a toast for success
    // e.g. update user trackers database with new <tracker>
  }, [])

  return (
    <div className="create-tracker">
      <Stepper
        steps={[
          generateStep('step1', <FirstStep />),
          generateStep('step2', <SecondStep />),
          generateStep('step3', <ThirdStep />)
        ]}
        onSubmitStepper={handleSubmitTracker}
      />
    </div>
  )
}