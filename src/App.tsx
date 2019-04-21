import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import { StateLoading, StateDisplayed, StateReady } from './components';
import { Entry, Result } from './types';

const sheetUrl =
    'https://spreadsheets.google.com/feeds/list/1F6niOY6NGLMFD0PxMITgZ0iThof5zVeCKSswuqRB0XE/1/public/values?alt=json';

const mapRow = (row: any): Result => {
    let result = {} as Result;

    for (let prop in row) {
        if (prop.startsWith('gsx$')) {
            const key = prop.replace('gsx$', '');
            const value = row[prop];
            result[key] = (value && value.$t) || null;
        }
    }

    return result;
};

const addScores = (entries: Entry[], result: Result) => {
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
    // scores = Array.from(new Set(scores)); // Keep only unique scores
    scores = scores.sort((a, b) => b - a); // Sort in ascending order

    entries.forEach(entry => {
        entry.rank = scores.indexOf(entry.score) + 1;
    });
};

function App() {
    const [poolResult, setPoolResult] = useState();
    const [poolEntries, setPoolEntries] = useState();
    const [showData, setShowData] = useState(false);

    const toggleVisibility = () => {
        setShowData(!showData);
    };

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
                entries = entries.sort((a, b) => a.rank - b.rank);
                setPoolEntries(entries);
            });
    }, []);

    return (
        <main className="container">
            {!poolEntries && <StateLoading />}
            {/*{poolEntries && !showData && <StateReady onToggle={toggleVisibility} />}*/}
            {poolEntries && <StateDisplayed result={poolResult} entries={poolEntries} />}
        </main>
    );
}

export default App;
