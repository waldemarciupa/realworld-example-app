import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history } from './store';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/App';

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
/* istanbul ignore else */
if (window.Cypress) {
  window.store = store;
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render((
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <BrowserRouter>
        <App />
        {/* <Routes>
          <Route path="/" element={<App />} />
        </Routes> */}
      </BrowserRouter>
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>
));
