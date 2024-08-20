import React, { PropsWithChildren, createContext, useState } from "react"
import { ILegend, ITracker } from "../interfaces"
import { DEFAULT_TRACKER, PREDEFINED_LEGEND_ARRAY } from "../constants"
import { noop } from "lodash"

interface ITrackerContextProps {
  trackersArray: ITracker[]
  setTrackersArray: React.Dispatch<React.SetStateAction<ITracker[]>>
  currentTracker: ITracker
  setCurrentTracker: React.Dispatch<React.SetStateAction<ITracker>>
  predefinedLegend: ILegend[]
  setPredefinedLegend: React.Dispatch<React.SetStateAction<ILegend[]>>
}

export const TrackerContext = createContext<ITrackerContextProps>({
  trackersArray: [],
  setTrackersArray: noop,
  currentTracker: DEFAULT_TRACKER,
  setCurrentTracker: noop,
  predefinedLegend: PREDEFINED_LEGEND_ARRAY,
  setPredefinedLegend: noop
})

export const TrackerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [trackersArray, setTrackersArray] = useState<ITracker[]>([])
  const [currentTracker, setCurrentTracker] = useState<ITracker>(DEFAULT_TRACKER)
  const [predefinedLegend, setPredefinedLegend] = useState<ILegend[]>(PREDEFINED_LEGEND_ARRAY)

  return (
    <TrackerContext.Provider
      value={{
        trackersArray,
        setTrackersArray,
        currentTracker,
        setCurrentTracker,
        predefinedLegend,
        setPredefinedLegend
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}