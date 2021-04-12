import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';

import client from './Components/Misc/apolloClient'
import store from './Components/ReduxStore/store'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);
