
import React from 'react';
import { Link } from 'react-router-dom';

export const AddTeamForm = () => {
  return (
    <div className="dash-buttons">
        <Link to={'/add-team'} className="btn btn-light"
          ><i className=" text-primary"></i>Add Team</Link>
    </div>
  )
}

export const EditTeamForm = ({teamid}) => {
  return (
    <div className="dash-buttons">
        <Link to={`/edit-team/${teamid}`} className="btn btn-light"
          ><i className=" text-primary"></i>edit Team</Link>
    </div>
  )
}












