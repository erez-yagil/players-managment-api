import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CreateClub from './clubs-Forms/createClub';

const AddClubPage = () => {
  return(
<Fragment>
  <h1>Add Club</h1>
   <CreateClub />
</Fragment>
  )
}

export default connect()(AddClubPage)