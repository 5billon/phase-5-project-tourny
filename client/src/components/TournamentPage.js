import { useEffect, useState } from "react";
import React from 'react';

function TournamentPage(props) {
    const [tournamentData, setTournamentData] = useState(null)
    const [participants, setParticipants] = useState([])
    const tournamentId = props.match.params.id;

    useEffect(() => {
        fetch(`/tournaments/${tournamentId}`)
        .then((r) => {
            if(!r.ok){
                throw new Error('Network error')
            }
            return r.json()
        })
        .then((data) => {
            setTournamentData(data)
        })
        .catch((error) => {
            console.error('Error when fetching tournament data', error)
        })
        fetch(`/tournaments/${tournamentId}/participants`)
            .then((r)=>{
                if (!r.ok) {
                    throw new Error('Network error')
                }
                return r.json()
            })
            .then((data) => {
                setParticipants(data)
            })
            .catch((error) => {
                console.error('Error when fetching the participants data', error)
            })
    }, [tournamentId])

    return (
        <div class='tourny-details-div'>
            {tournamentData ? (
                <div class='tourny-header-div'>
                    <h1>Tournament Details</h1>
                    <p>Tournament Name: {tournamentData.name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {participants.length > 0 ? (
                <div class='tourny-participant-div'>
                    <h2>Participants</h2>
                    <ul>
                        {participants.map((participant)=> (
                            <li key={participant.id}>{participant.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading Participants...</p>
            )}
        </div>
    )
}

export default TournamentPage