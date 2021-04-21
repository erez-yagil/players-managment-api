import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EditTeam from './teams-Forms/editTeam';

const EditTeamPage = ({team}) => {
return(
<Fragment>
  <h1>Edit Team</h1>
  <EditTeam teamdata={team} />
</Fragment>
  )
}


const mapStateToProps = (state, props) => {
  return {
    team: state.team.teams.find(team => team._id === props.match.params.id )
  }
}

export default connect(mapStateToProps, { })(EditTeamPage)