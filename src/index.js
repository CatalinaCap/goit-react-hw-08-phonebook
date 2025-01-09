import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from 'pages/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
