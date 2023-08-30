import React from 'react'
import { usePictureContext } from './PictureContext'

function ContextButton() {
    const {isPictureVisable, setPictureVisible} = usePictureContext()
    console.log(isPictureVisable)
    return (
        <button onClick={() => setPictureVisible(!isPictureVisable)}>
            {isPictureVisable ? 'SecretButton On' : 'SecretButton Off'}

        </button>
    )
}

export default ContextButton