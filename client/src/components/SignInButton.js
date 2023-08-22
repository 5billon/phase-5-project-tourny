import React, {useContext, useState} from 'react'
import { Context } from './App'

function SignInButton() {
    const [signedIn, setSignedIn] = useContext(Context)

    return (
        <button onClick={() => setSignedIn(!signedIn)}>
            {signedIn ? 'Sign Out' : 'Sign in'}

        </button>
    )
}

export default SignInButton