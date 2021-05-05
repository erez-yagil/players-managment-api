/* eslint-disable array-callback-return */
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



const Chart = ({ team:{ teams }, player: { players } }) => {

  const teamsArray = [teams.map((team)=> team.teamName),teams.map((team)=> team.teamNum)];

  const ar = teamsArray[1].map((teamNum) => {
    const at = players.filter((player)=>player.teamNum === teamNum)
    return at.length
  })
  





  return (
    <div key='bar'>
      <Bar
      data={{
        labels: teamsArray[0],
        datasets:[
          {
            label:'Players in the teams',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            data:ar
          }],
          borderWidth: 1
      }}
      height={200}
      width={600}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
      />
    </div>
  )
}

Chart.propTypes = {
 team:PropTypes.object.isRequired,
 player:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  player:state.player,
  club:state.club,
  team:state.team
});

export default connect (mapStateToProps,{ })(Chart);