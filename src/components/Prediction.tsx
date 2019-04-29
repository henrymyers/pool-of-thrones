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
    points: string;
    showKey?: boolean;
    entry: Entry;
    result: Result;
    customRule?: (k: keyof Result) => Validity | null;
};

export const Prediction = ({
    question,
    keys,
    points,
    showKey = false,
    entry,
    result,
    customRule,
}: PredictionProps) => {
    const getValidity = (key: keyof Result): Validity => {
        // Custom rule allows for a question-specific check.
        if (customRule) {
            const validity = customRule(key);
            if (validity) {
                return validity;
            }
        }

        if (!result[key]) {
            // Result isn't decided yet
            return Validity.unknown;
        } else if (result[key] === entry[key]) {
            // Answer matches result
            return Validity.correct;
        } else {
            return Validity.incorrect;
        }
    };

    return (
        <div className="prediction">
            <h6 className="valign-wrapper" style={{ lineHeight: '1' }}>
                {question}
                <i
                    className="material-icons tooltipped grey-text"
                    style={{ marginLeft: '10px' }}
                    data-position="top"
                    data-tooltip={points}
                >
                    info_outline
                </i>
            </h6>
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
