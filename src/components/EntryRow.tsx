import React, { useEffect } from 'react';
import { Entry, Result, Status } from '../types';
import M from 'materialize-css';

const characterFields: (keyof Result)[] = [
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
];

const fields: any = {
    jonsnow: 'Jon Snow',
    sansastark: 'Sansa Stark',
    aryastark: 'Arya Stark',
    branstark: 'Bran Stark',
    cerseilannister: 'Cersei Lannister',
    jaimelannister: 'Jaime Lannister',
    tyrionlannister: 'Tyrion Lannister',
    daenerystargaryen: 'Daenerys Lannister',
    yaragreyjoy: 'Yara Greyjoy',
    theongreyjoy: 'Theon Greyjoy',
    eurongreyjoy: 'Euron Greyjoy',
    melisandre: 'Melisandre',
    jorahmormont: 'Jorah Mormont',
    thehound: 'The Hound',
    themountain: 'The Mountain',
    samwelltarly: 'Samwell Tarly',
    gilly: 'Gilly',
    littlesam: 'Little Sam',
    varys: 'Varys',
    brienne: 'Brienne',
    davos: 'Davos',
    bronn: 'Bronn',
    podrick: 'Podrick',
    tormund: 'Tormund',
    greyworm: 'Grey Worm',
    gendry: 'Gendry',
    bericdondarrion: 'Beric Dondarrion',
    isdaeneryspregnant: 'Is Daenerys pregnant?',
    whokillsthenightking: 'Who kills the night king?',
    whoendsupontheironthrone: 'Who ends up on the Iron Throne?',
};

export const CharacterList = ({
    title,
    characters,
}: {
    title: string;
    characters: (keyof Result)[];
}) => {
    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>{title}</th>
                </tr>
            </thead>
            <tbody>
                {characters.map((character, index) => (
                    <tr key={index}>
                        <td>{fields[character]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const EntryRow = ({ entry }: { entry: Entry }) => {
    useEffect(() => {
        M.AutoInit(); // Material CSS components
    }, []);

    const lives = characterFields.filter(f => entry[f] === Status.Lives);
    const deaths = characterFields.filter(f => entry[f] === Status.Dies);
    const walkers = characterFields.filter(f => entry[f] === Status.WhiteWalker);

    return (
        <ul className="collapsible expandable no-border">
            <li>
                <div className="collapsible-header primary white-text no-border">
                    <strong>
                        {entry.rank}. {entry.player}
                    </strong>
                    <span className="badge white-text">
                        {entry.score} {entry.score > 1 ? 'points' : 'point'}
                    </span>
                </div>
                <div className="collapsible-body white no-border">
                    <h5>Predictions</h5>

                    <div className="row">
                        <div className="col s12 m4">
                            <CharacterList title={Status.Lives} characters={lives} />
                        </div>
                        <div className="col s12 m4">
                            <CharacterList title={Status.Dies} characters={deaths} />
                        </div>
                        <div className="col s12 m4">
                            <CharacterList title={Status.WhiteWalker} characters={walkers} />
                        </div>
                    </div>

                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{fields.isdaeneryspregnant}</td>
                                <td>{entry.isdaeneryspregnant}</td>
                            </tr>
                            <tr>
                                <td>{fields.whokillsthenightking}</td>
                                <td>{entry.whokillsthenightking}</td>
                            </tr>
                            <tr>
                                <td>{fields.whoendsupontheironthrone}</td>
                                <td>{entry.whoendsupontheironthrone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
    );
};
