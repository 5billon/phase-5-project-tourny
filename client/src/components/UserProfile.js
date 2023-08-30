import { useEffect, useState } from "react"
import React from 'react'
import { useHistory } from 'react-router-dom'

function UserProfile(props) {
    const [user, setUser] = useState({})
    const [newProfilePicture, setNewProfilePicture] = useState('')
    const [isConfirmDeleteOpen, setConfirmDelete] = useState(false)
    const participantId = props.match.params.id;
    const history = useHistory()


    useEffect(() => {
        fetch(`/participants/${participantId}`)
            .then(r => r.json())
            .then(userData => {
                console.log('userData:', userData);
                setUser(userData)
            })

    }, [participantId])

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

    const confirmDeleteUser = () => {
        fetch(`/participants/${participantId}`, {
            method: 'DELETE',
        })
            .then(r => {
                if (r.ok) {
                    console.log('Profiled deleted successfully')
                    history.push('/')
                    window.location.reload()
                } else {
                    console.log('Profile was NOT deleted.')
                }
                setConfirmDelete(false)
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
                    <button class='update-pic-button'onClick={updateProfilePicture}>Update Profile Picture</button>
                    <button class='delete-profile-button'onClick={deleteUserProfile}>Delete Profile</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {isConfirmDeleteOpen && (
                <div>
                    <p>Are you sure you want to delete your profile?</p>
                    <button onClick={cancelDeleteUser}>No!</button>
                    <button onClick={confirmDeleteUser}>Yes, please.</button>
                </div>
            )}
        </div>
    )
}

export default UserProfile