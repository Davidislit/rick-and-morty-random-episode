export const seriesUrl = 'http://www.omdbapi.com/?apikey=f37810a0&t=Rick+and+morty';

export const seasonUrl = (seasonNum: number) => `http://www.omdbapi.com/?apikey=f37810a0&t=Rick+and+morty&Season=${seasonNum}`;

export const episodeUrl = (seasonNum: number, episodeNum: number) => `http://www.omdbapi.com/?apikey=f37810a0&t=Rick+and+morty&Season=${seasonNum}&Episode=${episodeNum}`;