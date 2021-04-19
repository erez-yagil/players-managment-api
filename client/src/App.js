import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/alert';
import Dashboard from '../src/components/dashboard/dashboard';
import CreateProfile from '../src/components/profile-forms/createProfile';
import EditProfile from '../src/components/profile-forms/editProfile';
import UsersInfo from '../src/components/users/Users';
import clubsInfo from '../src/components/clubs/Clubs';
import CreateClub from '../src/components/clubs/clubs-Forms/createClub';
// import EditClub from '../src/components/clubs/clubs-Forms/editClub';





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
  }, [])
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
              <Route exact path='/register' component={Register}/>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
              <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              <PrivateRoute exact path='/clubs' component={clubsInfo}/>
              <PrivateRoute exact path='/add-club' component={CreateClub}/>
              {/* <PrivateRoute exact path='/edit-club' component={EditClub}/> */}
              <PrivateRoute exact path='/players' component={UsersInfo}/>

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
    
    
  );
}

export default App;
