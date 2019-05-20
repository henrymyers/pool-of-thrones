import React from 'react';
import { Entry, Result, Status, Validity } from '../types';
import { Copydeck } from './copydeck';
import { Prediction } from './Prediction';
import './EntryRow.css';

const characters: (keyof Result)[] = [
    'jonsnow',
    'sansastark',
    'aryastark',
    'branstark',
    'cerseilannister',
    'jaimelannister',
    'tyrionlannister',
    'daenerystargaryen',
    'yaragreyjoy',
    'theongreyjoy',
    'eurongreyjoy',
    'melisandre',
    'jorahmormont',
    'thehound',
    'themountain',
    'samwelltarly',
    'gilly',
    'littlesam',
    'varys',
    'brienne',
    'davos',
    'bronn',
    'podrick',
    'tormund',
    'greyworm',
    'gendry',
    'bericdondarrion',
];

export const EntryRow = ({ entry, result }: { entry: Entry; result: Result }) => {
    const lives = characters.filter(f => entry[f] === Status.Lives);
    const deaths = characters.filter(f => entry[f] === Status.Dies);
    const walkers = characters.filter(f => entry[f] === Status.WhiteWalker);
    const colorClass = entry.rank === 1 ? 'warning' : 'primary';

    return (
        <ul className="collapsible no-border">
            <li>
                <div
                    className={`collapsible-header ${colorClass} hoverable white-text no-border valign-wrapper`}
                >
                    {entry.rank === 1 ? (
                        <span className="entry-rank neutral warning-text z-depth-2">♛</span>
                    ) : (
                        <span className="entry-rank neutral z-depth-2">{entry.rank}</span>
                    )}
                    <span className="entry-name">{entry.player}</span>
                    <span className="badge white-text">
                        {entry.score} {entry.score > 1 ? 'points' : 'point'}
                    </span>
                </div>
                <div className="collapsible-body white no-border">
                    <Prediction
                        question="Who dies?"
                        points="1pt per correct answer"
                        keys={deaths}
                        showKey={true}
                        entry={entry}
                        result={result}
                        customRule={(k: keyof Result) => {
                            // Whitewalkers also count as deaths
                            return result[k] === Status.WhiteWalker && entry[k] === Status.Dies
                                ? Validity.correct
                                : null;
                        }}
                    />
                    <Prediction
                        question="Who becomes a white walker?"
                        points="2pts per correct answer"
                        keys={walkers}
                        showKey={true}
                        entry={entry}
                        result={result}
                    />
                    <Prediction
                        question="Who lives?"
                        points="1pt per correct answer"
                        keys={lives}
                        showKey={true}
                        entry={entry}
                        result={result}
                    />
                    <Prediction
                        question="Is Daenerys pregnant?"
                        points="1pt if correct"
                        keys={['isdaeneryspregnant']}
                        entry={entry}
                        result={result}
                    />
                    <Prediction
                        question="Who kills the night king?"
                        points="2pts if correct"
                        keys={['whokillsthenightking']}
                        entry={entry}
                        result={result}
                    />
                    <Prediction
                        question="Who ends up on the Iron Throne?"
                        points="4pts if correct"
                        keys={['whoendsupontheironthrone']}
                        entry={entry}
                        result={result}
                        customRule={(k: keyof Result) => {
                            // If the predicted ruler has already died, mark as incorrect.
                            return !result[k] && deaths.find(d => Copydeck[d] === entry[k])
                                ? Validity.incorrect
                                : null;
                        }}
                    />
                </div>
            </li>
        </ul>
    );
};
