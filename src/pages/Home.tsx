import React, { useEffect, useState } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonFab,
	IonFabButton,
	IonIcon,
} from '@ionic/react';
import './Home.css';
import EpisodeItem from '../components/EpisodeItem';
import { inject, observer } from 'mobx-react';
import EpisodeService from '../components/EpisodeService';
import { toJS } from 'mobx';
import { playOutline } from 'ionicons/icons';
import { ModalPicker } from '../components/ModalPicker';
import { useToast } from "@agney/ir-toast";


type HomeProps = {
	episodeService: EpisodeService;
};

const Home: React.FC<HomeProps> = ({ episodeService }) => {
	const [ disableInfiniteScroll, setDisableInfiniteScroll ] = useState<boolean>(false);
	const [ isOpen, setIsOpen ] = useState<boolean>(false);
	const Toast = useToast();

	const showSeasons = () => {
		const episodes = toJS(episodeService.seasonList);
		return episodes.map((episode, index) => {
			return <EpisodeItem key={index} episode={episode} seasonNum={episodeService.seasonNumber} />;
		});
	};

	const fetchMoreEpisodes = async ($event: CustomEvent<void>) => {
		if (episodeService.seasonNumber >= 4) {
			setDisableInfiniteScroll(true);
		}
		await episodeService.fetchSeason();
		($event.target as HTMLIonInfiniteScrollElement).complete();
	};

	const onInitFetchSeason = async () => {
			await episodeService.fetchSeason();
			if (episodeService.error) {
				Toast.error("Unable to fetch episodes");
			}	
	}

	useEffect(() => {
		onInitFetchSeason();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Rick & Morty Episode Picker</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid fixed>
					<IonRow>
						<IonCol size="12" size-md="6">
							{showSeasons()}
							<IonInfiniteScroll
								threshold="50px"
								disabled={disableInfiniteScroll}
								onIonInfinite={(e: CustomEvent<void>) => fetchMoreEpisodes(e)}
							>
								<IonInfiniteScrollContent loadingText="Loading more good epiodes..." />
							</IonInfiniteScroll>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>

			<IonFab className="fabIcon" vertical="bottom" horizontal="end" slot="fixed">
				<IonFabButton color="dark" onClick={() => setIsOpen(true)}>
					<IonIcon icon={playOutline} />
				</IonFabButton>
			</IonFab>

			<ModalPicker isOpen={isOpen} setIsOpen={setIsOpen} />
		</IonPage>
	);
};

export default inject('episodeService')(observer(Home));
