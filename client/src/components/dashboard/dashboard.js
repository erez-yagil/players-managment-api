/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../actions/players'
import Spinner from '../layout/spinner';

const Dashboard = ({ auth:{user}, player: { player, loading } }) => {



  return loading && player == null ? <Spinner /> :
  <Fragment>
    <h1 className="lead text-primary">Dashboard</h1>
    <p className="lead">
      <i className= 'fas fa-user'></i> Welcome {user && user.firstName}
    </p>
  </Fragment>
};

Dashboard.propTypes = {
  getCurrentPlayer: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  player:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  player:state.player
});

export default connect (mapStateToProps,{ getCurrentPlayer })(Dashboard);
