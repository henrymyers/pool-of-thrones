import React from 'react';
import { Entry, Result, Status } from '../types';
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

    return (
        <ul className="collapsible no-border">
            <li>
                <div className="collapsible-header primary hoverable white-text no-border valign-wrapper">
                    <span className="entry-rank neutral z-depth-2">{entry.rank}</span>
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
                    />
                </div>
            </li>
        </ul>
    );
};
