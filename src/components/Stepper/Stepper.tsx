import React, { useCallback, useMemo, useState } from "react"
import './Stepper.scss'
import { Popover, Steps, StepsProps } from "antd"
import { Button } from "../Button/Button"
import { IStep } from "../../interfaces"
import { Tracker } from "../Tracker/Tracker"

interface IStepperProps {
  steps: IStep[]
  hasError: boolean
  onSubmitStepper: () => void
}

export const Stepper: React.FC<IStepperProps> = ({ steps, hasError, onSubmitStepper }) => {  
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
        type="inline"
      />

      <div className="stepper__title">
        {steps[currentStep].header}
      </div>

      <div className="stepper__content">
        {steps[currentStep].content}
      </div>

      <div className="stepper__buttons">
        {currentStep !== 0 &&
          <Button
            label='Previous'
            onClick={handlePrevStep}
            isDisabled={currentStep === 0}
          />
        }

        {currentStep === steps.length - 1
          ? <Button
              label='Done'
              onClick={onSubmitStepper}
            />
          : <Button
              label={currentStep === steps.length - 2 ? 'Preview' : 'Next'}
              onClick={handleNextStep}
              isDisabled={hasError}
            />
        }
      </div>
    </div>
  )
}