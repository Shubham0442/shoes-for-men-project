import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';
import { store } from './Redux/Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
    <ChakraProvider>
       <Provider store={store}>
          <App />
       </Provider>
    </ChakraProvider>
</BrowserRouter>
  
);

reportWebVitals();
