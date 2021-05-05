import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/alert';
import Dashboard from '../src/components/dashboard/dashboard';
import UsersInfo from '../src/components/players/Players';
import playerProfile from '../src/components/players/playerProfile';
import AddPlayerPage from '../src/components/players/AddPlayerPage';
import EditPlayerPage from '../src/components/players/EditPlayerPage';

import clubsInfo from '../src/components/clubs/Clubs';
import AddClubPage from '../src/components/clubs/AddClubPage';
import EditClubPage from '../src/components/clubs/EditClubPage';

import teamsInfo from '../src/components/teams/Teams';
import AddTeamPage from '../src/components/teams/AddTeamPage';
import EditTeamPage from '../src/components/teams/EditTeampage';

import UploadFile from '../src/components/layout/UploadFile';


import PrivateRoute from '../src/components/routing/PrivateRoute';


// redux //
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from '../src/actions/auth';
import setAuthToken from '../src/utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}


const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing}/>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/Login' component={Login}/>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
              <PrivateRoute exact path='/clubs' component={clubsInfo}/>
              <PrivateRoute exact path='/add-club' component={AddClubPage}/>
              <PrivateRoute exact path='/edit-club/:id' component={EditClubPage}/>
              <PrivateRoute exact path='/players' component={UsersInfo}/>
              <PrivateRoute exact path='/player/:id' component={playerProfile}/>
              <PrivateRoute exact path='/players/:teamNum' component={UsersInfo}/>
              <PrivateRoute exact path='/add-player' component={AddPlayerPage}/>
              <PrivateRoute exact path='/addplayertoteam/:id' component={AddPlayerPage}/>
              <PrivateRoute exact path='/edit-player/:id' component={EditPlayerPage}/>
              <PrivateRoute exact path='/edit-team/:id' component={EditTeamPage}/>
              <PrivateRoute exact path='/teams' component={teamsInfo}/>
              <PrivateRoute exact path='/add-team' component={AddTeamPage}/>
              <PrivateRoute exact path='/addteamtoclub/:id' component={AddTeamPage}/>
              <PrivateRoute exact path='/edit-team/:id' component={EditTeamPage}/>
              <PrivateRoute exact path='/upload' component={UploadFile}/>


            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
    
    
  );
}

export default App;
