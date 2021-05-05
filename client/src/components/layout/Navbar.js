import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import HelpButton from './help/helpButton';

const Navbar = ({auth:{isAuth, loading},logout}) => {



  const authLinks = (
    <Fragment>
      <div>
          <ul>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/clubs">Clubs</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/players">Players</Link>
            </li>
            {/* <li>
              <Link to="/matches">Matches</Link>
            </li> */}
          </ul>
      </div>
      <div>
          <ul>
          <li>
            <HelpButton />
          </li>
          <li>
            <a onClick={logout} href="/">
              <i className="fas fa-sign-out-alt"></i>
              <span className="hide-sm">{' '} Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
      
    </Fragment>
  );

  const guestLinks = (
    <ul>
        <li>
          <Link to='/login'>
            Login
          </Link>
          </li>
          <li>
            <HelpButton />
          </li>
          
      </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/dashboard'>
           Sayfan <i className="fas fa-football-ball"></i>
        </Link>
      </h1>
      {!loading && (<Fragment>{isAuth? authLinks: guestLinks} </Fragment>)}
      
    </nav>
    
  )
}


Navbar.propTypes = {
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
  auth: state.auth
})


export default connect(mapStateToProps,{ logout })(Navbar)
