import { Entry, Result } from '../types';
import React from 'react';

export const Copydeck: any = {
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

export type PredictionProps = {
    question: string;
    keys: (keyof Result)[];
    showKey?: boolean;
    entry: Entry;
    result: Result;
};

export const Prediction = ({ question, keys, showKey = false, entry, result }: PredictionProps) => {
    const getValidity = (key: keyof Result): Validity => {
        if (!result[key]) {
            return Validity.unknown;
        } else if (result[key] === entry[key]) {
            return Validity.correct;
        } else {
            return Validity.incorrect;
        }
    };

    return (
        <div className="prediction">
            <h6>{question}</h6>
            <div>
                {keys.length > 0 &&
                    keys.map((k, index) => (
                        <Answer
                            key={index}
                            text={showKey ? Copydeck[k] : entry[k]}
                            validity={getValidity(k)}
                        />
                    ))}
                {!keys.length && <div className="grey-text">No one</div>}
            </div>
        </div>
    );
};

export enum Validity {
    correct = 'correct',
    incorrect = 'incorrect',
    unknown = 'unknown',
}

export type AnswerProps = {
    text: string;
    validity: Validity;
};

export const Answer = ({ text, validity }: AnswerProps) => {
    return (
        <span className={'tag ' + validity}>
            <strong>{text}</strong>
            {validity === Validity.correct && <i className="material-icons right">check</i>}
            {validity === Validity.incorrect && <i className="material-icons right">clear</i>}
        </span>
    );
};
