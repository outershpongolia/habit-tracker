import React, { useContext } from "react"
import './ThirdStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Tracker } from "../../../components/Tracker/Tracker"

interface IThirdStepProps {}

export const ThirdStep: React.FC<IThirdStepProps> = () => {
  const {tracker} = useContext(TrackerContext)

  return (
    <div className="third-step">
      <Tracker data={tracker.timeFormatOptions} />
    </div>
  )
}