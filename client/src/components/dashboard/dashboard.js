/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/spinner';
import DashboardActions from './DashboardActions'

const Dashboard = ({ getCurrentProfile, auth:{user}, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile()
    }, []);

  return loading && profile == null ? <Spinner /> :
  <Fragment>
    <h1 className="lead text-primary">Dashboard</h1>
    <p className="lead">
      <i className= 'fas fa-user'></i> Welcome {user && user.firstName}
    </p>
    {profile !== null ?
     <Fragment>
      <DashboardActions />
     </Fragment> :
     <Fragment>
        <p>There is no profile fot this user</p>
        <Link to="create-profile" className='btn btn-primary my-1'> Add profile </Link>
     </Fragment>}
  </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile
});

export default connect (mapStateToProps,{ getCurrentProfile })(Dashboard);
