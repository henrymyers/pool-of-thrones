import React from 'react';
import { Entry, Result } from '../types';
import { EntryRow } from './EntryRow';

export const StateDisplayed = ({ result, entries }: { result: Result; entries: Entry[] }) => {
    return (
        <div>
            {entries.map((item, index: number) => (
                <EntryRow entry={item} result={result} key={index} />
            ))}
        </div>
    );
};
