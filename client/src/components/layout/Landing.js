import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const landing = ({ isAuth }) => {
  if (isAuth){
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">AFI</h1>
        <p className="lead">
          Manage you data
        </p>
        <div className="buttons">
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
          <Link to="/register" className="btn btn-success">
          register
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}


landing.propType = {
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});



export default connect(mapStateToProps)(landing)
