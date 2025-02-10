interface Artist {
    id: string;
    name: string;
}

function findArtistIndex(artists, name) {
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].name === name) {
            return artists[i].id;
        }
    }
    return -1;
}

function findArtistIndexDICHO(artist, name) {
    let idMin: number = 0;
    let idMax: number = artist.length - 1;
    let idMiddle: number;
    while (idMin <= idMax) {
        idMiddle = Math.floor((idMin + idMax) / 2);
        if (artist[idMiddle].name === name) {
            return artist[idMiddle].id;
        } else if (artist[idMiddle].name < name) {
            idMin = idMiddle + 1;
        } else {
            idMax = idMiddle - 1;
        }
    }
    return -1;
}

const artists: Artist[] = [
    { id: '1', name: 'Adele' },
    { id: '2', name: 'Beyonce' },
    { id: '3', name: 'Coldplay' },
    { id: '4', name: 'Drake' },
    { id: '5', name: 'Eminem' }
];


console.log(findArtistIndex(artists, 'Coldplay')); // Devrait retourner '3'
console.log(findArtistIndex(artists, 'Adele'));    // Devrait retourner '1'
console.log(findArtistIndex(artists, 'Unknown'));  // Devrait retourner -1


function generateArtists(count: number): Artist[] {
    const artists: Artist[] = [];
    const names = ['Adele', 'Beyonce', 'Coldplay', 'Drake', 'Eminem', 'Foo Fighters', 'Gorillaz', 'Halsey', 'Imagine Dragons', 'Jay-Z'];

    for (let i = 0; i < count; i++) {
        const name = names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1);
        artists.push({ id: (i + 1).toString(), name });
    }

    return artists.sort((a, b) => a.name.localeCompare(b.name));
}




const size=100000;
let id_1 = 0;
let id_2 = Math.floor(size / 2);
let id_3 = size - 1;

const largeDataset = generateArtists(size);

import {PerfStat} from "../PerfStat";

PerfStat.creatingData();
largeDataset.sort((a, b) => a.name.localeCompare(b.name));
PerfStat.dataCreated();

const t1_old = new PerfStat();
const r1_old = findArtistIndex(largeDataset, largeDataset[id_1].name);
t1_old.finish('Old search 1');
const t2_old = new PerfStat();
const r2_old = findArtistIndex(largeDataset, largeDataset[id_2].name);
t2_old.finish('Old search 2');
const t3_old = new PerfStat();
const r3_old = findArtistIndex(largeDataset, largeDataset[id_3].name);
t3_old.finish('Old search 3');

console.log('---');

const t1_new = new PerfStat();
const r1_new = findArtistIndexDICHO(largeDataset, largeDataset[id_1].name);
t1_new.finish('New search 1');
const t2_new = new PerfStat();
const r2_new = findArtistIndexDICHO(largeDataset, largeDataset[id_2].name);
t2_new.finish('New search 2');
const t3_new = new PerfStat();
const r3_new = findArtistIndexDICHO(largeDataset, largeDataset[id_3].name);
t3_new.finish('New search 3');

PerfStat.testPassed(r1_old === r1_new);
PerfStat.testPassed(r2_old === r2_new);
PerfStat.testPassed(r3_old === r3_new);




