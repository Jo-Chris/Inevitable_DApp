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

// config
const config: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/c5bfe7c30f07419b8968f97b56f44104'
    }
}

root.render(
    <DAppProvider config={config}>
        <App/>
    </DAppProvider>
);

reportWebVitals();
