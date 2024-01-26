import React, { PropsWithChildren, createContext, useState } from "react"
import { ITracker } from "../interfaces"
import { DEFAULT_TRACKER } from "../constants"
import { noop } from "lodash"

interface ITrackerContextProps {
  tracker: ITracker
  setTracker: React.Dispatch<React.SetStateAction<ITracker>>
}

export const TrackerContext = createContext<ITrackerContextProps>({
  tracker: DEFAULT_TRACKER,
  setTracker: noop
})

export const TrackerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tracker, setTracker] = useState<ITracker>(DEFAULT_TRACKER)

  return (
    <TrackerContext.Provider
      value={{
        tracker,
        setTracker
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}