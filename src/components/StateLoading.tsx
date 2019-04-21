import logo from '../logo.svg';
import React from 'react';

export const StateLoading = () => {
    return (
        <div className="">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading predictions...</p>
        </div>
    );
};
