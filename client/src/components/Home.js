import React, { useEffect, useState } from 'react';

function Home() {
    const title = 'Welcome to From First to Last!'
    const stuff = 'Here you can create personal and professional tournaments to keep track of!'
    const [tournaments, setTournaments] = useState([])

    // useEffect(() => {
    //     fetch('/tournaments')
    //         .then(r => r.json())
    //         .then(tournaments => setTournaments(tournaments))
    // }, [])
    return (
        <div className='home-div'>
            <div className='home-title-div'>
                <h1>{title}</h1>
            </div>
            <p>{stuff}</p>
        </div>
    )
}

export default Home;