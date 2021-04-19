import React from 'react';
import { Link } from 'react-router-dom';

export const AddClubForm = () => {
  return (
    <div className="dash-buttons">
        <Link to="/add-club" className="btn btn-light"
          ><i className=" text-primary"></i>Add Club</Link>
    </div>
  )
}

