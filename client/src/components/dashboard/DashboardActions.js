import React from 'react';
import { Link } from 'react-router-dom';

function DashboardAction() {
    return (
    <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className=" text-primary"></i>Edit My Profile</Link>
    </div>
  )
}

export default DashboardAction;
