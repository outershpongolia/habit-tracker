import React, { useCallback, useContext } from "react"
import './FirstStep.scss'
import { Input } from "../../../components/Input/Input"
import { TrackerContext } from "../../../context/TrackerContext"

interface IFirstStepProps {}

export const FirstStep: React.FC<IFirstStepProps> = () => {
  const {tracker, setTracker} = useContext(TrackerContext)

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker(tracker => {
      return {
        ...tracker,
        name: e.target.value
      }
    })
  }, [setTracker])

  return (
    <div className="first-step">
      <div className="first-step__title">
        Name your tracker:
      </div>

      <Input
        className="first-step__input"
        name='tracker-name'
        value={tracker?.name || ''}
        onChange={handleChangeInput}
        maxLength={40}
        autoFocus
      />
    </div>
  )
}