import ReactDOM from 'react-dom/client'
import './index.css'

import Router from './router'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
      <Toaster position='top-right' />
    </PersistGate>
  </Provider>,
)
