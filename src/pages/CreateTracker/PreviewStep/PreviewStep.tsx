import React from "react"
import './PreviewStep.scss'
import { Tracker } from "../../../components/Tracker/Tracker"

interface IPreviewStepProps {}

export const PreviewStep: React.FC<IPreviewStepProps> = () => {
  return (
    <div className="preview-step">
      <Tracker preview />
    </div>
  )
}