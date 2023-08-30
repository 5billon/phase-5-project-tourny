import React from 'react'
import { usePictureContext } from './PictureContext'

function SignInButton() {
    const { isPictureVisable, setPictureVisible } = usePictureContext()
    return (
        <button onClick={() => setPictureVisible(!isPictureVisable)}>
            {isPictureVisable ? 'SecretButton On' : 'SecretButton Off'}

        </button>
    )
}

export default SignInButton