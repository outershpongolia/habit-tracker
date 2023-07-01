import React, { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { EPopup } from '../constants'
import { noop } from 'lodash'

interface IFormContextProps {
    openPopup: EPopup
    handleOpenPopup: (popup: EPopup) => () => void
    handleClosePopup: () => void
}

export const FormContext = createContext<IFormContextProps>({
    openPopup: EPopup.CLOSED,
    handleOpenPopup: () => noop,
    handleClosePopup: noop
})

export const FormContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ openPopup, setOpenPopup ] = useState(EPopup.CLOSED)

    const handleOpenPopup = useCallback((popup: EPopup) => {
        return () => setOpenPopup(popup)
    }, [setOpenPopup])

    const handleClosePopup = useCallback(() => {
        setOpenPopup(EPopup.CLOSED)
    }, [setOpenPopup])
    
    return (
        <FormContext.Provider
            value={{
                openPopup,
                handleOpenPopup,
                handleClosePopup
            }}
        >
            {children}
        </FormContext.Provider>
    )
}