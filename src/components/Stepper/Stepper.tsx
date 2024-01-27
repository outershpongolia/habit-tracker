import React, { useCallback, useMemo, useState } from "react"
import './Stepper.scss'
import { Steps } from "antd"
import { Button } from "../Button/Button"
import { IStep } from "../../interfaces"

interface IStepperProps {
  steps: IStep[]
  onSubmitStepper: () => void
}

export const Stepper: React.FC<IStepperProps> = ({ steps, onSubmitStepper }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = useCallback(() => {
    setCurrentStep(currentStep => {
      return currentStep < steps.length - 1
        ? currentStep + 1
        : currentStep
    })
  }, [steps])

  const handlePrevStep = useCallback(() => {
    setCurrentStep(currentStep => {
      return currentStep === 0
        ? currentStep
        : currentStep - 1
    })
  }, [])

  const generateItems = useMemo(() => {
    return steps.map(step => ({ key: step.header, title: step.header }))
  }, [steps])

  return (
    <div className="stepper">
      <Steps
        current={currentStep}
        items={generateItems}
        labelPlacement='vertical'
        
      />

      <div className="stepper__content">
        {steps[currentStep].content}
      </div>

      <div className="stepper__buttons">
        <Button
          label='Previous'
          onClick={handlePrevStep}
        />

        {currentStep === steps.length - 1
          ? <Button
              label='Done'
              onClick={onSubmitStepper}
            />
          : <Button
              label={currentStep === steps.length - 2 ? 'Preview' : 'Next'}
              onClick={handleNextStep}
            />
        }
      </div>
    </div>
  )
}