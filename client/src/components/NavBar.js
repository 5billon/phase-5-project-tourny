import React from 'react';
import SignInButton from './SignInButton'
import { Link, useHistory, BrowserRouter as Router } from 'react-router-dom'

function NavBar({ user, handleUser }) {
    const history = useHistory()
    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        }).then(() => {
            handleUser(null);
            history.push('/')
        })
    }
    function handleLogin() {
        history.push('/login', { from: history.location.pathname })
    }
    function handleSignup() {
        history.push('/signup', { from: history.location.pathname })
    }
    return (
        <Router>
            <div className='navBar'>
                <div>
                    <Link className='navbar-stuff' to='/'>From First to Last</Link>
                </div>
                <SignInButton />
            
            <div>
                {user ? (
                    <>
                        <button onClick={handleLogout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <div onClick={handleSignup}>Sign up</div>
                        <div onClick={handleLogin}>Log in</div>
                    </>
                )}
            </div>
            </div>
        </Router>
    )

}

export default NavBar;