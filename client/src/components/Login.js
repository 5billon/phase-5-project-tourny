import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ handleUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleLogin = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log("Login working", data);
                const prev = history.location.state && history.location.state.from
                if (prev && (prev !== '/login' && prev !== '/signup')) {
                    history.push(prev)
                }
                else {
                    history.push('/')
                }
                handleUser(data)

            } else if (response.status === 401) {
                setError("Incorrect password entered.");
            } else if (response.status === 404) {
                setError("Participant not found.");
            } else {
                setError(data.error || "Login failed.");
            }

        } catch (error) {
            console.error("Error here.", error);
            setError("An unexpected error occurred.");
        }
    };
    return (
        <div className='login-div'>
            <h2 className='login-button'>Login</h2>
            {error && <div className='error-login'>{error}</div>}
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='form-username-div'>
                    <label className='form-label'>Username:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <p></p>
                <div className='form-password-div'>
                    <label className='form-label'>Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p></p>
                <div className='login-button-div'>
                    <button className='login-button-classname' onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Login;