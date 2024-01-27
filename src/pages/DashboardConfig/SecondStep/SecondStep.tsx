import React, { useContext } from "react"
import './SecondStep.scss'
import { Tracker } from "../../../components/Tracker/Tracker"
import { TrackerContext } from "../../../context/TrackerContext"

interface ISecondStepProps {}

export const SecondStep: React.FC<ISecondStepProps> = () => {
  return (
    <div className="second-step">
      Config for legend
    </div>
  )
}