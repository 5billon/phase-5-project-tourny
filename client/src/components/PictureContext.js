import React, { createContext, useContext, useState} from 'react'

const PictureContext = createContext();

export const usePictureContext = () => {
    return useContext(PictureContext)
}

export const PictureProvider = ({children}) => {
    const [isPictureVisable, setPictureVisible] = useState(false)

    return (
        <PictureContext.Provider value={{isPictureVisable, setPictureVisible}}>
            {children}
        </PictureContext.Provider>
    )
}

export default PictureContext;