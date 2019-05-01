export enum Status {
    Undecided = 'Undecided',
    Lives = 'Lives',
    Dies = 'Dies',
    WhiteWalker = 'White Walker',
}

export enum Validity {
    correct = 'correct',
    incorrect = 'incorrect',
    unknown = 'unknown',
}

export type Result = {
    [index: string]: any;
    player: string;
    jonsnow: Status;
    sansastark: Status;
    aryastark: Status;
    branstark: Status;
    cerseilannister: Status;
    jaimelannister: Status;
    tyrionlannister: Status;
    daenerystargaryen: Status;
    yaragreyjoy: Status;
    theongreyjoy: Status;
    eurongreyjoy: Status;
    melisandre: Status;
    jorahmormont: Status;
    thehound: Status;
    themountain: Status;
    samwelltarly: Status;
    gilly: Status;
    littlesam: Status;
    varys: Status;
    brienne: Status;
    davos: Status;
    bronn: Status;
    podrick: Status;
    tormund: Status;
    greyworm: Status;
    gendry: Status;
    bericdondarrion: Status;
    isdaeneryspregnant: string;
    whokillsthenightking: string;
    whoendsupontheironthrone: string;
};

export type Entry = Result & {
    score: number;
    rank: number;
};
