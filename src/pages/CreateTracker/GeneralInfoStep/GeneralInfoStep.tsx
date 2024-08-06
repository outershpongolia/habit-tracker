import React, { useCallback, useContext } from "react"
import './GeneralInfoStep.scss'
import { Input } from "../../../components/Input/Input"
import { TrackerContext } from "../../../context/TrackerContext"

interface IGeneralInfoStepProps {}

export const GeneralInfoStep: React.FC<IGeneralInfoStepProps> = () => {
  const {currentTracker, setCurrentTracker} = useContext(TrackerContext)

  const handleChangeInput = useCallback((value: string, name: string) => {
    setCurrentTracker(tracker => {
      return {
        ...tracker,
        [name]: value
      }
    })
  }, [setCurrentTracker])

  return (
    <div className="general-info-step">
      <Input
        name='name'
        value={currentTracker?.name || ''}
        onChange={handleChangeInput}
        maxLength={16}
        label="title"
      />

      <Input
        name='description'
        value={currentTracker?.description || ''}
        onChange={handleChangeInput}
        maxLength={40}
        label="description"
      />
    </div>
  )
}