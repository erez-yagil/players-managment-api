/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateTeam from './teams-Forms/createTeam';
import { getCurrentClub } from '../../actions/clubs';
import Spinner from '../layout/spinner';


const AddTeamPage = ({match, getCurrentClub, club:{ club, loading }}) => {

const clubId = match.params.id;

useEffect(() => {
  getCurrentClub(clubId)
}, []);

  if(clubId){
    return loading && club ? <Spinner /> : (
      <Fragment>
        <h1>Add Team To Club:</h1>
        <CreateTeam toClub={true} />
      </Fragment>
    )
  }

    return(
      <Fragment>
        <h1>Add Team</h1>
         <CreateTeam />
      </Fragment>
        )
  }



AddTeamPage.propTypes = {
  getCurrentClub:PropTypes.func.isRequired,
  club:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  club:state.club
})

export default connect(mapStateToProps, { getCurrentClub })(AddTeamPage)