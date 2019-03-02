import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { Login, Register } from '../../pages/Auth';

import Home from '../../pages/Home'; //HyperSpace
import SubSpace from '../../pages/SubSpace';
import Profile from '../../pages/Profile';
import HoloSpace from '../../pages/HoloSpace';
import CyberSpace from '../../pages/CyberSpace';

import { NotFound } from '../../pages/Error'; //VoidSpace

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/@me" component={Profile} />
          <Route path="/d/:deckId/:id" exact component={SubSpace} />
          <Route path="/d/:deckId/holo/:id" exact component={HoloSpace} />
          <Route path="/ssh/d" exact component={CyberSpace} />
          <Route path="/ssh/d/:id" exact component={CyberSpace} />
          {/*<Route
            path="/ssh/d/holo/:id"
            exact
            component={HoloSecretSpace}
          />*/}

          <Route render={() => <NotFound />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
