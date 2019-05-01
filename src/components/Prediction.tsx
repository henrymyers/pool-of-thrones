import React from 'react';
import { Entry, Result, Validity } from '../types';
import { Copydeck } from './copydeck';

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
