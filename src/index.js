import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Dark } from './components/App/Themes';

import App from './components/App';

ReactDOM.render(
  <MuiThemeProvider theme={Dark}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
