import React, { useContext, useState } from 'react'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [me, setMe] = useState()

  return (
    <UserContext.Provider value={{ me, setMe }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext).me
}

export const useSetUser = () => {
  return useContext(UserContext).setMe
}

export default UserProvider