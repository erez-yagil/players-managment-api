
import React from 'react';
import { Link } from 'react-router-dom';

export const AddPlayerForm = () => {
  return (
    <div className="dash-buttons">
        <Link to={'/add-player'} className="btn btn-light"
          ><i className=" text-primary"></i>Add Player</Link>
    </div>
  )
}

export const EditPlayerForm = ({profileId}) => {
  return (
    <div className="dash-buttons">
        <Link to={`/edit-player/${profileId}`} className="btn btn-light"
          ><i className=" text-primary"></i>edit Player</Link>
    </div>
  )
}







