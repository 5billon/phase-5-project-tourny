import React, {useContext} from 'react'
import { Context } from './App'

function SignInButton() {
    const [context, setContext] = useContext(Context)

    return (
        <button onClick={() => setContext(!context)}>
            {context ? 'useContext on' : 'useContext off'}

        </button>
    )
}

export default SignInButton