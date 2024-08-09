import React from "react"
import "./TrackerLegend.scss"
import { ILegend } from "../../../interfaces"

interface ITrackerLegendProps {
  selectedLegend: ILegend[]
}

export const TrackerLegend: React.FC<ITrackerLegendProps> = ({ selectedLegend }) => {
  return (
    <div className="tracker-legend">
      {selectedLegend.map(x => {
        return (
          <div key={x.id} className="tracker-legend__option">
            <div
              className="tracker-legend__color-circle"
              style={{backgroundColor: x.color}}
            />

            {x.status}
          </div>
        )
      })}
    </div>
  )
}