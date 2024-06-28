import React, { useCallback, useContext, useEffect } from "react"
import './GeneralInfoStep.scss'
import { Input } from "../../../components/Input/Input"
import { TrackerContext } from "../../../context/TrackerContext"

interface IGeneralInfoStepProps {}

export const GeneralInfoStep: React.FC<IGeneralInfoStepProps> = () => {
  const {tracker, setTracker} = useContext(TrackerContext)

  const handleChangeInput = useCallback((value: string, name: string) => {
    setTracker(tracker => {
      return {
        ...tracker,
        [name]: value
      }
    })
  }, [setTracker])

  return (
    <div className="general-info-step">
      <Input
        name='name'
        value={tracker?.name || ''}
        onChange={handleChangeInput}
        maxLength={16}
        label="title"
      />

      <Input
        name='description'
        value={tracker?.description || ''}
        onChange={handleChangeInput}
        maxLength={40}
        label="description"
      />
    </div>
  )
}