import React, {useContext} from 'react'
import { Context } from './App'

function SignInButton() {
    const [signedIn, setSignedIn] = useContext(Context)

    return (
        <button onClick={() => setSignedIn(!signedIn)}>
            {signedIn ? 'useContext on' : 'useContext off'}

        </button>
    )
}

export default SignInButton