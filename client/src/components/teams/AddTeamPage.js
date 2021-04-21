import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CreateTeam from './teams-Forms/createTeam';

const AddTeamPage = (props) => {
  return(
<Fragment>
  <h1>Add Team</h1>
   <CreateTeam />
</Fragment>
  )
}

export default connect()(AddTeamPage)