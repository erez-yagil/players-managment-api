import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


const Register = ({ setAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    password2:''
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onchange = e => setFormData({...formData, [e.target.name]:e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert('password do not match', 'danger');
    } else {
      register({ firstName, lastName, email, password });
    }
  } 

  if (isAuth){
    return <Redirect to="/dashboard" />
  }
  
  return (
    <section className="container">
      <h1 className="lead text-primary">Add Player</h1>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
           type="text" 
           placeholder="firstName" 
           name="firstName" 
           value={firstName} 
           onChange={e=> onchange(e)} 
           required />
        </div>
        <div className="form-group">
          <input
           type="text" 
           placeholder="lastName" 
           name="lastName" 
           value={lastName} 
           onChange={e=> onchange(e)} 
           required />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={e=> onchange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth:PropTypes.bool
}

const mapStateToProps = state=>({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { setAlert, register })(Register);
