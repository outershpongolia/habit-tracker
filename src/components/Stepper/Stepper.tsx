import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import './Stepper.scss'
import { Steps } from "antd"
import { Button } from "../Button/Button"
import { IStep } from "../../interfaces"
import { TrackerContext } from "../../context/TrackerContext"

interface IStepperProps {
  steps: IStep[]
  onSubmitStepper: () => void
}

export const Stepper: React.FC<IStepperProps> = ({ steps, onSubmitStepper }) => {  
  const {currentTracker} = useContext(TrackerContext)

  const [currentStep, setCurrentStep] = useState(0)
  const [hasError, setHasError] = useState(false)

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

  useEffect(() => {
    switch (currentStep) {
      case 0:
        return setHasError(!currentTracker.name)
      case 1:
        return setHasError(!currentTracker.timeFormat)
      case 2:
        return setHasError(!currentTracker.timeFormatOptions.startDate && !currentTracker.timeFormatOptions.endDate)
      case 3:
        return setHasError(currentTracker.habits.length === 0)
      case 4:
        return setHasError(currentTracker.legend.length === 0)
      default:
        return setHasError(false)
    }
  }, [currentStep, currentTracker, setHasError])

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