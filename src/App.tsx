import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const sheetUrl =
    'https://spreadsheets.google.com/feeds/list/1F6niOY6NGLMFD0PxMITgZ0iThof5zVeCKSswuqRB0XE/1/public/values?alt=json';

const mapRow = (row: any) => {
    let result: any = {};

    for (let prop in row) {
        if (prop.startsWith('gsx$')) {
            const key = prop.replace('gsx$', '');
            const value = row[prop];
            result[key] = (value && value.$t) || null;
        }
    }

    return result;
};

const addScores = (entries: any[], result: any) => {
    if (!entries || !result) {
        return;
    }

    entries.forEach(entry => {
        let score = 0;

        for (let prop in result) {
            if (result.hasOwnProperty(prop) && result[prop] === entry[prop]) {
                if (prop === 'whoendsupontheironthrone') {
                    score += 4;
                } else if (prop === 'whokillsthenightking') {
                    score += 2;
                } else if (prop === 'isdaeneryspregnant') {
                    score += 1;
                } else {
                    switch (entry[prop]) {
                        case 'White Walker':
                            score += 2;
                            break;
                        default:
                            score += 1;
                    }
                }
            }
        }

        entry.score = score;
    });
};

const addRanks = (entries: any[]) => {
    let scores = entries.map(entry => entry.score);
    scores = Array.from(new Set(scores)); // Keep only unique scores
    scores = scores.sort((a, b) => b - a); // Sort in ascending order

    entries.forEach(entry => {
        entry.rank = scores.indexOf(entry.score) + 1;
    });
};

function App() {
    const [poolResult, setPoolResult] = useState();
    const [poolEntries, setPoolEntries] = useState();

    useEffect(() => {
        fetch(sheetUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                let allRows: any[] = (response && response.feed && response.feed.entry) || [];
                allRows = allRows.map(mapRow);

                let result = allRows[0];
                setPoolResult(result);

                let entries = allRows.slice(1);
                addScores(entries, result);
                addRanks(entries);
                setPoolEntries(entries.sort((a, b) => a.score - b.score));

                console.log('>>>> result = ', result); // **********
                console.log('>>>> entries = ', entries); // **********
            });
    }, []);

    return (
        <div className="App">
            {!poolEntries && (
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Loading predictions...</p>
                </header>
            )}
            {poolEntries && <section>{JSON.stringify(poolEntries)}</section>}
        </div>
    );
}

export default App;
