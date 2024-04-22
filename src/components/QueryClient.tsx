import React, { createContext } from 'react'

const Context = createContext({})

export const ClientContextProvider = () => {
    if(!Context) {
        throw Error("the context not exist!")
    }

  return (
    <Context.Provider>

    </Context.Provider>
  )
}
