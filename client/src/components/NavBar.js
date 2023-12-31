import React from 'react';
import ContextButton from './ContextButton'
import { Link, useHistory } from 'react-router-dom'

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

        <div className='navBar'>
            <div>
                <Link className='navbar-stuff' to='/'>From First to Last</Link>
            </div>
            <div>
                <Link className='navbar-stuff' to='/tournaments'>Tournaments</Link>
            </div>
            <div>
                <Link className='navbar-stuff' to='/createtournament'>Create Tournament</Link>
            </div>
            <ContextButton />
            <div>
                {user ? (
                    <>
                        <Link className='navbar-stuff' to={`/userprofile/${user.id}`}>Profile</Link>
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
    )
}

export default NavBar;