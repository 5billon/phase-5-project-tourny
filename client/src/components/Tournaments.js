import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Tournaments() {
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        fetch(`/tournaments`)
            .then(r => r.json())
            .then(tournamentsData => setTournaments(tournamentsData))
    }, [])
    console.log(tournaments)

    return (
        <div className="tournaments">
            {tournaments.map((tournament) => (
                <p key={tournament.id}>
                    <>
                        <Link to={`/tournament/${tournament.id}`}>
                            {tournament.name} - {tournament.tournament_contest}
                        </Link>
                    </>
                </p>
            ))}
        </div>
    )
}

export default Tournaments