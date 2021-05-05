import React, { useState } from 'react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { helpMessage } from '../../../actions/dashboard';


const ContactUsForm = ({ helpMessage, auth, close }) => {

  const [formDate, setFormDate] = useState({
    name:'',
    email:'',
    message:''
  });

  const {
    name,
    email,
    message
    } = formDate;

    const onChange = e => setFormDate({...formDate, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault()
      helpMessage(formDate);
      close();
   }


  return (
    <div className="help-form" id="help-form">
      <h2 className="header">Send message</h2>
      <form id="contact" onSubmit={e => onSubmit(e)}>
      <p class="name">
          <input name="name" value={name} type="text" class="feedback-input" required placeholder="Your Name" id="name" onChange={e =>onChange(e)} />
      </p>
      <p class="email">
          <input name="email" value={email} type="email" required class="feedback-input" id="email" placeholder="Your Email" onChange={e =>onChange(e)} />
     </p>
     <p class="text">
        <textarea name="message" value={message} class="feedback-input" id="comment" placeholder="Message" onChange={e =>onChange(e)}></textarea>
     </p>
      <div class="submit">
          <button type="submit" class="button-blue">Submit</button>
        <div class="ease"></div>
    </div>

    </form>
    </div>
  )
}

ContactUsForm.propTypes = {
  helpMessage:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  auth:state.auth
})

export default connect(mapStateToProps, { helpMessage })(withRouter(ContactUsForm));


