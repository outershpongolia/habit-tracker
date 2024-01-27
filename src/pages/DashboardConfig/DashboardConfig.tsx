import React, { useCallback, useMemo } from "react"
import './DashboardConfig.scss'
import { generateStep } from "../../utilities"
import { Stepper } from "../../components/Stepper/Stepper"
import { FirstStep } from "./FirstStep/FirstStep"
import { SecondStep } from "./SecondStep/SecondStep"
import { ThirdStep } from "./ThirdStep/ThirdStep"

interface IDashboardConfigProps {}

export const DashboardConfig: React.FC<IDashboardConfigProps> = () => {
  const generateSteps = useMemo(() => {
    const step1 = generateStep('step1', <FirstStep />)
    const step2 = generateStep('step2', <SecondStep />)
    const step3 = generateStep('step3', <ThirdStep />)
    
    return [step1, step2, step3]
  }, [])

  const handleSubmitTracker = useCallback(() => {
    // TO DO: throw some api call and a toast for success
    // e.g. update user trackers database with new <tracker>
  }, [])

  return (
    <div className="dashboard-config">
      <Stepper
        steps={generateSteps}
        onSubmitStepper={handleSubmitTracker}
      />
    </div>
  )
}