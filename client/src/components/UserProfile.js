import { useState } from "react"
import React from 'react'
import { useHistory } from 'react-router-dom'

function UserProfile(props) {
    const [newProfilePicture, setNewProfilePicture] = useState('')
    const [isConfirmDeleteOpen, setConfirmDelete] = useState(false)
    const participantId = props.match.params.id;
    const { user, setUser } = props
    const history = useHistory()

    const updateProfilePicture = () => {
        const data = { picture: newProfilePicture }

        fetch(`/participants/${participantId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(r => {
                if (r.ok) {
                    setNewProfilePicture('')
                    console.log('Picture was added successfully.')
                } else {
                    console.log('Picture was not added successfully')
                }
            })
    }

    const handleInput = e => {
        const newProfilePicture = e.target.value
        setNewProfilePicture(newProfilePicture)
    }

    const deleteUserProfile = () => {
        setConfirmDelete(true)
    }

    const logoutUser = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
    }

    const deleteProfile = () => {
        fetch(`/participants/${participantId}`, {
            method: 'DELETE',
        })
            .then(profileDeleteResp => {
                if (profileDeleteResp.ok) {
                    console.log('Profile deleted')
                    logoutUser()
                    setConfirmDelete(false)
                    setUser(null)
                    history.push('/')
                } else {
                    console.log('Profile was NOT deleted')
                }
            })
    }

    const cancelDeleteUser = () => {
        setConfirmDelete(false)
    }

    return (
        <div>
            {user ? (
                <div class='profile-div'>
                    <h1>Profile</h1>
                    <p class='username'>Username: {user.name}</p>
                    <div>
                        <p class='profile-pic'>Profile Picture:
                            <img class='profile-picture' src={user.picture} alt='' />
                        </p>
                    </div>
                    <input type='text' placeholder="Enter Image URL" value={newProfilePicture} onChange={handleInput} />
                    <button class='update-pic-button' onClick={updateProfilePicture}>Update Profile Picture</button>
                    <button class='delete-profile-button' onClick={deleteUserProfile}>Delete Profile</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {isConfirmDeleteOpen && (
                <div class='delete-confirm-div'>
                    <p class='delete-confirm-text'>Are you sure you want to delete your profile?</p>
                    <button class='delete-confirm-no-button'onClick={cancelDeleteUser}>No!</button>
                    <button class='delete-confirm-yes-button'onClick={deleteProfile}>Yes, please.</button>
                </div>
            )}
        </div>
    )
}

export default UserProfile