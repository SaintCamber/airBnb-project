import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from "./store/session"
import { ModalProvider ,Modal} from './context/Modal';
import { UserProvider } from './context/userContext';
const store = configureStore();
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions
  window.store = store;
}

function Root() {
  return (
    <BrowserRouter>
    <ReduxProvider store={store}>
    <UserProvider>
      <ModalProvider>
        <App />
        <Modal />
    </ModalProvider>
    </UserProvider>
    </ReduxProvider>
    


      </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
