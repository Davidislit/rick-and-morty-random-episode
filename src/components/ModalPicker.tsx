import React, { useState } from 'react'
import { IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonImg } from '@ionic/react';
import './ModalPicker.css';
import { EpisodeData } from './EpisodeService';
import Axios from 'axios';
import EpisodeItem from './EpisodeItem';
import { episodeUrl, seasonUrl, seriesUrl } from '../constants/url';
import { useToast } from "@agney/ir-toast";

type ModalPickerProps = {
    isOpen: boolean;
    setIsOpen: Function;
}

export const ModalPicker: React.FC<ModalPickerProps> = ({ isOpen, setIsOpen }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chosenEpisode, setChosenEpisode] = useState<EpisodeData>();
    const Toast = useToast();

    const randomEpisode = async () => {
        if (chosenEpisode !== undefined) {
            setChosenEpisode(undefined);
        }
        setIsLoading(true);

        const seriesResponse = await Axios.get(seriesUrl);

        if (seriesResponse.data.Response === "False" || seriesResponse.status > 200) {
            Toast.error("Unable to get random episode");
            return;
        }

        const randomSeason = Math.floor((Math.random() * seriesResponse.data.totalSeasons) + 1);

        const seasonResponse = await Axios.get(seasonUrl(randomSeason));

        if (seasonResponse.data.Response === "False" || seasonResponse.status > 200) {
            Toast.error("Unable to get random episode");
            return;
        }

        const randomChosenEpisode = Math.floor((Math.random() * seasonResponse.data.Episodes.length) + 1);

        const randomChosenEpisodeReponse = await Axios.get(episodeUrl(randomSeason, randomChosenEpisode));

        if (randomChosenEpisodeReponse.data.Response === "False" || randomChosenEpisodeReponse.status > 200) {
            Toast.error("Unable to get random episode");
            return;
        }

        setTimeout(() => {
            setChosenEpisode(randomChosenEpisodeReponse.data);
            setIsLoading(false);   
        }, 3000);
    }

    const closeModal = () => {
        setIsLoading(false);
        setChosenEpisode(undefined);
        setIsOpen(false)
    }

    return (
        <IonModal isOpen={isOpen} cssClass='my-custom-class'>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Episode Picker</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className="ModalContainer">
                <div>
                    <p className="ModalText">Let me pick random episode for you 😎</p>
                </div>
                <div className="ModalContent">
                    {
                        chosenEpisode !== undefined ?
                            <EpisodeItem episode={chosenEpisode} seasonNum={parseInt(chosenEpisode.Season)} />
                            :
                            <IonImg src={isLoading ? "assets/wubba.gif" : "assets/dance.gif"} />
                    }
                </div>
                <div className="ModalButtons">
                    <IonButton onClick={closeModal} color="danger" >Close</IonButton>
                    <IonButton onClick={randomEpisode} color="dark" >Random Episode</IonButton>
                </div>
            </div>
        </IonModal>
    );
}

export default ModalPicker;

