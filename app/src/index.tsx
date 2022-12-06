import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {Config, DAppProvider, Goerli} from "@usedapp/core";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const config: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/51eb184b21c24b54a5d001444d4a8f4d',
    },
}

root.render(
    <DAppProvider config={config}>
        <App/>
    </DAppProvider>
);

reportWebVitals();
