
import React from 'react';
import { Link } from 'react-router-dom';

export const AddClubForm = () => {
  return (
    <div className="dash-buttons">
        <Link to={'/add-club'} className="btn btn-light"
          ><i className=" text-primary"></i>Add Club</Link>
    </div>
  )
}

export const EditClubForm = ({clubid}) => {
  return (
    <div className="dash-buttons">
        <Link to={`/edit-club/${clubid}`} className="btn btn-light"
          ><i className=" text-primary"></i>edit Club</Link>
    </div>
  )
}

export const AddTeamToClub = ({clubid}) => {
  return (
    <div className="dash-buttons">
        <Link to={`/addteamtoclub/${clubid}`} className="btn btn-light"
          ><i className=" text-primary"></i>Add team to club</Link>
    </div>
  )
}












