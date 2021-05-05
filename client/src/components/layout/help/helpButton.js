/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import ContactUsForm from './ContactUsForm';

const HelpButton = () => (
  <Popup
    trigger={<Link> Help </Link>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <ContactUsForm close={close}/>
      </div>
    )}
  </Popup>
)


export default HelpButton