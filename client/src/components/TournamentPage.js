import Reach from 'react';

function TournamentPage(props) {
    const {pageId} = props.match.params;

    return (
        <div>
            <h1>Tournament Page</h1>
            <p>Page ID: {pageId}</p>
        </div>
    )
}

export default TournamentPage