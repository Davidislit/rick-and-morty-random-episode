import { observable, action, computed, toJS } from 'mobx';
import axios from 'axios';
import { seasonUrl } from '../constants/url';
import to from 'await-to-js';

export interface Episode {
    Title: string;
    Released: string;
    Episode: string;
    imdbRating: string;
    imdbID: string;
}

export interface Season {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: Episode[];
    Response: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface EpisodeData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Season: string;
    Episode: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    seriesID: string;
    Type: string;
    Response: string;
}

class EpisodeService {

    @observable
    seasonList: Episode[] = [];

    @observable
    seasonNumber: number = 1;

    @observable
    modalPicker: boolean = false;

    @observable
    error: boolean = false;

    @computed get enteries(): Episode[] {
        return toJS(this.seasonList);
    }

    @action
    async fetchSeason() {
        const url = seasonUrl(this.seasonNumber);
        const [error, seasonResponse] = await to(axios.get(url));

        if (error) {
            this.error = true;
            return;
        }

        if (seasonResponse!.data.Response === "True" && seasonResponse!.status === 200) {
            seasonResponse!.data.Episodes.forEach((episode: Episode) => this.seasonList.push(episode));
            this.seasonNumber = this.seasonNumber + 1;
            this.error = false;
        } else {
            
        }  
    }

    @action
    async openModal() {
        this.modalPicker = true;
    }

    @action
    async closeModal() {
        this.modalPicker = false;
    }

}

export default EpisodeService;