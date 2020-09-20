import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Provider } from "mobx-react";
import EpisodeService from './components/EpisodeService';
import { ToastProvider } from "@agney/ir-toast";


const App: React.FC = () => {

  const episodeService = new EpisodeService();

  return (
    <IonApp>
      <Provider episodeService={episodeService}>
        <ToastProvider value={{ duration: 2000 }}>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
            </IonRouterOutlet>
          </IonReactRouter>
        </ToastProvider>
      </Provider>
    </IonApp>
  );
}

export default App;
