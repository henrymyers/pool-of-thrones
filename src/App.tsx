import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import logo from './logo.png';
import { Entry, Result, Status } from './types';
import { EntryRow } from './components';

const sheetUrl =
    'https://spreadsheets.google.com/feeds/list/1F6niOY6NGLMFD0PxMITgZ0iThof5zVeCKSswuqRB0XE/1/public/values?alt=json';

const mapRow = (row: any): Result => {
    let result = {} as Result;

    for (let prop in row) {
        if (row.hasOwnProperty(prop) && prop.startsWith('gsx$')) {
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
            if (result.hasOwnProperty(prop)) {
                if (result[prop] === entry[prop]) {
                    if (prop === 'whoendsupontheironthrone') {
                        // Correctly predicted who won the game of thrones
                        score += 4;
                    } else if (prop === 'whokillsthenightking') {
                        // Correctly predicted the night king's killer
                        score += 2;
                    } else if (prop === 'isdaeneryspregnant') {
                        // Correctly predicted pregnancy
                        score += 1;
                    } else if (entry[prop] === Status.WhiteWalker) {
                        // Correctly predicted White Walker
                        score += 2;
                    } else {
                        // Default value for matching answers
                        score += 1;
                    }
                } else if (result[prop] === Status.WhiteWalker && entry[prop] === Status.Dies) {
                    // White walkers also count as deaths
                    score += 1;
                }
            }
        }

        entry.score = score;
    });
};

const addRanks = (entries: any[]) => {
    let scores = entries.map(e => e.score).sort((a, b) => b - a); // Sort in ascending order

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

    useEffect(() => {
        M.AutoInit(); // Material CSS components
    }, [showData]);

    return (
        <>
            <header style={{ paddingTop: showData ? '6vh' : '30vh' }}>
                <img src={logo} className="logo" alt="logo" />
                {!poolEntries && (
                    <div>
                        <div className="progress">
                            <div className="indeterminate" />
                        </div>
                        <div className="white-text">Loading predictions...</div>
                    </div>
                )}
                {poolEntries && !showData && (
                    <div>
                        <h6 className="danger-text">
                            WARNING: The following pool results may contain spoilers.
                        </h6>
                        <a
                            className="waves-effect waves-light btn-large primary u-mt"
                            onClick={toggleVisibility}
                        >
                            Show Results
                        </a>
                    </div>
                )}
            </header>
            <main className="container u-mt" style={{ marginBottom: '6vh' }}>
                {poolEntries &&
                    showData &&
                    poolEntries.map((item: Entry, index: number) => (
                        <EntryRow entry={item} result={poolResult} key={index} />
                    ))}
            </main>
        </>
    );
}

export default App;
