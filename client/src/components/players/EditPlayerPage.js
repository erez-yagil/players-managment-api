import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EditPlayer from './players-Forms/editPlayer';

const EditPlayerPage = ({player}) => {

return(
<Fragment>
  <h1>Edit Player</h1>
  <EditPlayer playerData={player} />
</Fragment>
  )
}


const mapStateToProps = (state, props) => {
  return {
    player: state.player.players.find(player => player._id === props.match.params.id )
  }
}

export default connect(mapStateToProps, { })(EditPlayerPage)