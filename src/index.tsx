import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Root from './Root';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
      <Root />
		</Provider>
	</React.StrictMode>
);