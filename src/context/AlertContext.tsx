import { noop } from "lodash"
import React, { PropsWithChildren, createContext, useCallback, useState } from "react"
import { toast } from "react-toastify"
import { EStatus } from "../constants"

interface IAlertContextProps {
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  handleToast: (status: EStatus, message: string) => void
}

export const AlertContext = createContext<IAlertContextProps>({
  errorMessage: '',
  setErrorMessage: noop,
  handleToast: noop
})

export const AlertContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleToast = useCallback((status: EStatus, message: string) => {
    switch (status) {
      case EStatus.SUCCESS:
        toast.success(message, { autoClose: 8000 })
        break
      case EStatus.ERROR:
        toast.error(message, { autoClose: 9000 })
    }
  }, [])

  return (
    <AlertContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        handleToast,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}