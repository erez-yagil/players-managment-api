import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';


const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });

  const{ email, password } = formData;

  const onchange = e => setFormData({...formData, [e.target.name]:e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    await login(email, password);
  } 
  
  if (isAuth){
    return <Redirect to="/dashboard" />
  }
  
  
  return (
    <section className="container">
      <h1 className="lead text-primary">Sign In</h1>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email"
          value={email} 
          onChange={e=> onchange(e)}
          required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={e=> onchange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sing In" />
      </form>
    </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth:PropTypes.bool
}

const mapStateToProps = state=>({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login);
