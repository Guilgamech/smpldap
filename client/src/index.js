import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Configuration from './utils/configuration'
//assets/css/material-dashboard-react.css?v=1.10.0
import "../src/assets/css/material-dashboard-react.css";
Sentry.init({
    dsn: Configuration.value('sentryDsn'),
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.2,
});

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
