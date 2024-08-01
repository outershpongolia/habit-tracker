import React, { PropsWithChildren, createContext, useState } from "react"
import { ILegendOptions, ITracker } from "../interfaces"
import { DEFAULT_TRACKER, PREDEFINED_LEGEND_ARRAY } from "../constants"
import { noop } from "lodash"

interface ITrackerContextProps {
  tracker: ITracker
  setTracker: React.Dispatch<React.SetStateAction<ITracker>>
  predefinedLegend: ILegendOptions[]
  setPredefinedLegend: React.Dispatch<React.SetStateAction<ILegendOptions[]>>
}

export const TrackerContext = createContext<ITrackerContextProps>({
  tracker: DEFAULT_TRACKER,
  setTracker: noop,
  predefinedLegend: PREDEFINED_LEGEND_ARRAY,
  setPredefinedLegend: noop
})

export const TrackerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tracker, setTracker] = useState<ITracker>(DEFAULT_TRACKER)
  const [predefinedLegend, setPredefinedLegend] = useState<ILegendOptions[]>(PREDEFINED_LEGEND_ARRAY)

  console.log({tracker})

  return (
    <TrackerContext.Provider
      value={{
        tracker,
        setTracker,
        predefinedLegend,
        setPredefinedLegend
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}