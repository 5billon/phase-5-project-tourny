import React, { useContext } from 'react';
import PictureContext from './PictureContext';
import Picture from './Picture';

function Home() {
    const title = 'Welcome to From First to Last!'
    const stuff = 'Here you can create personal and professional tournaments to keep track of!'
    const {isPictureVisible} = useContext(PictureContext)
    
    return (
        <div className='home-div'>
            <div className='home-title-div'>
                <h1>{title}</h1>
            </div>
            <p>{stuff}</p>
            <Picture />
        </div>
    )
}

export default Home;