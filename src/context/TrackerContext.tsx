import React, { PropsWithChildren, createContext, useState } from "react"
import { ICategory, ILegend, ITracker } from "../interfaces"
import { DEFAULT_TRACKER, PREDEFINED_CATEGORIES, PREDEFINED_LEGEND_ARRAY } from "../constants"
import { noop } from "lodash"

interface ITrackerContextProps {
  trackersArray: ITracker[]
  setTrackersArray: React.Dispatch<React.SetStateAction<ITracker[]>>
  currentTracker: ITracker
  setCurrentTracker: React.Dispatch<React.SetStateAction<ITracker>>
  predefinedLegend: ILegend[]
  setPredefinedLegend: React.Dispatch<React.SetStateAction<ILegend[]>>
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
}

export const TrackerContext = createContext<ITrackerContextProps>({
  trackersArray: [],
  setTrackersArray: noop,
  currentTracker: DEFAULT_TRACKER,
  setCurrentTracker: noop,
  predefinedLegend: PREDEFINED_LEGEND_ARRAY,
  setPredefinedLegend: noop,
  categories: PREDEFINED_CATEGORIES,
  setCategories: noop
})

export const TrackerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [trackersArray, setTrackersArray] = useState<ITracker[]>([])
  const [currentTracker, setCurrentTracker] = useState<ITracker>(DEFAULT_TRACKER)
  const [predefinedLegend, setPredefinedLegend] = useState<ILegend[]>(PREDEFINED_LEGEND_ARRAY)
  const [categories, setCategories] = useState(PREDEFINED_CATEGORIES)
  console.log({currentTracker})

  return (
    <TrackerContext.Provider
      value={{
        trackersArray,
        setTrackersArray,
        currentTracker,
        setCurrentTracker,
        predefinedLegend,
        setPredefinedLegend,
        categories,
        setCategories
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}