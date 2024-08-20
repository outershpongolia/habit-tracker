import React, { PropsWithChildren, createContext, useState } from 'react'
import { IUser } from '../interfaces'
import { noop } from 'lodash'

interface IUserContextProps {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IUserContextProps>({
  user: null,
  setUser: noop
})

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)

  console.log({user})

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}