import React, { useState, useEffect } from 'react'
import { IonCard, IonCardHeader, IonAvatar, IonLabel, IonCardContent, IonList, IonItem, IonText } from '@ionic/react'
import './EpisodeItem.css';
import { Episode, EpisodeData } from './EpisodeService';
import Axios from 'axios';
import { episodeUrl } from '../constants/url';

type EpisodeItemProps = {
    episode: Episode;
    seasonNum: number;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode, seasonNum }) => {

    const [episodeData, setEpisodeData] = useState<EpisodeData>({} as EpisodeData);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const fetchEpisode = async () => {
        setIsLoading(true);
        const responseData = await Axios(episodeUrl(seasonNum, parseInt(episode.Episode)));
        if (responseData.status >= 200) {
            setEpisodeData(responseData.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchEpisode();
    }, [])

    const renderEpisodeDetails = () => {
        if (isLoading) {
            return (
                <IonLabel>
                    <h3>IMDB Rating: {episode.imdbRating}</h3>
                </IonLabel>
            );
        } else {
            return (
                <IonText>
                    {episodeData.Plot}
                </IonText>
            );
        }
    }

    return (
        <IonCard className="episode-card" >
            <IonCardHeader className="episode-item">
                <IonItem button detail={false} lines="none">
                    <IonAvatar slot="start">
                        <img src={episodeData.Poster} alt="pic" />
                    </IonAvatar>
                    <IonLabel>
                        <h2>{episode.Title}</h2>
                        <h3>Season {episodeData.Season} Episode {episodeData.Episode}</h3>
                    </IonLabel>
                </IonItem>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                        {renderEpisodeDetails()}
                </IonList>
            </IonCardContent>
        </IonCard >
    )
}

export default EpisodeItem
