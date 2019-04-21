import React from 'react';

export const StateReady = ({ onToggle }: { onToggle: any }) => {
    return (
        <div>
            <a className="waves-effect waves-light btn" onClick={onToggle}>
                Show Scores
            </a>
        </div>
    );
};
