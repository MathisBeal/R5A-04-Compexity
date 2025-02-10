interface Artist {
  id: string;
  name: string;
  genre: string;
  stage: string;
}

interface Stage {
  id: string;
  name: string;
  genres: Array<string>;
}

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}

function assignStagesNEW(artists, stages) {
  const genres = {};
  for (let stage of stages) {
    for (let genre of stage.genres) {
      genres[genre] = stage.id;
    }
  }

  for (let artist of artists) {
    artist.stage = genres[artist.genre];
  }
}


function generateArtists(count: number): Artist[] {
  const artists: Artist[] = [];
  const names = ['Adele', 'Beyonce', 'Coldplay', 'Drake', 'Eminem', 'Foo Fighters', 'Gorillaz', 'Halsey', 'Imagine Dragons', 'Jay-Z'];
  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Reggae', 'Country', 'Blues', 'Metal'];

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1);
    const genre = genres[Math.floor(Math.random() * genres.length)];
    artists.push({stage: "", id: (i + 1).toString(), name, genre});
  }

  return artists.sort((a, b) => a.name.localeCompare(b.name));
}

const stages: Stage[] = [
  {id: '1', name: 'Main Stage', genres: ['Pop', 'Rock']},
  {id: '2', name: 'Second Stage', genres: ['Hip-Hop', 'Electronic']},
  {id: '3', name: 'Third Stage', genres: ['Jazz', 'Classical']},
  {id: '4', name: 'Acoustic Stage', genres: ['Reggae', 'Country']},
  {id: '5', name: 'Dance Stage', genres: ['Blues', 'Metal']}
];

import {PerfStat} from "../PerfStat";

const size = 1000000;

PerfStat.creatingData();
const artists = generateArtists(size);
const artists2 = [...artists];
PerfStat.dataCreated();
console.log();

const t1 = new PerfStat();
assignStages(artists, stages);
t1.finish('Old function');

const t2 = new PerfStat();
assignStagesNEW(artists2, stages);
t2.finish('New function');

function compare(artists1, artists2) {
  for (let i = 0; i < artists1.length; i++) {
    if (artists1[i].stage !== artists2[i].stage) {
      return false;
    }
  }
  return true;
}

PerfStat.testPassed(compare(artists, artists2));
// Résultat: moins efficace que la fonction fournie...
