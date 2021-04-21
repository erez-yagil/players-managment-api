import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EditClub from './clubs-Forms/editClub';

const EditClubPage = ({club}) => {
  
return(
<Fragment>
  <h1>Edit Club</h1>
  <EditClub clubdata={club} />
</Fragment>
  )
}


const mapStateToProps = (state, props) => {
  return {
    club: state.club.clubs.find(club => club._id === props.match.params.id )
  }
}

export default connect(mapStateToProps, { })(EditClubPage)