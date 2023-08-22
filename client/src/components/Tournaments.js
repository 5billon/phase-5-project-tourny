import React, { useState, useEffect } from "react";

function Tournaments() {
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        fetch('/tournaments')
        .then(r=>r.json())
        .then(tournamentsData => setTournaments(tournamentsData))
    }, [])
    console.log(tournaments)
    
    return (
        <div className="tournaments">
            {tournaments.map((tournament)=> (
                <p key={tournament.id}>{tournament.name} - {tournament.tournament_contest}</p>
            ))}
        </div>
    )
}

export default Tournaments