import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { topicSubscribe } from '../../actions/index'

const styles = theme => ({
  root: {
    width: 'auto',
    overflowX: 'auto',
  },
  table: {
    height: 'auto'
  },
});

let id = 0;
class StatisticsBoard extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.props.topicSubscribe('/indoor/status','indoor_msgs/Status');
  }

  createData(name, status) {
    id += 1;
    return { id, name, status };
  }


  render() {
    let currentMission = this.props.rosTopics[0].currentMission
    let altitude = this.props.rosTopics[0].altitude
    if(!currentMission){
      currentMission = 'None'
    }
    if(!altitude){
      altitude = '???'
    }
    if(currentMission==0){
      currentMission = 'Patrol'
    }
    const data = [
      this.createData('Altitude',  altitude),
      this.createData('Current Mission',  currentMission),

    ];
    const { classes } = this.props;
    if (!this.props.rosTopics) {
      return (<div>Loading...</div>)
    }
    else {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell  component="th" scope="row">
                      {n.name}
                    </TableCell>
                    <TableCell  numeric>{n.status}</TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );

    }





  }
}


StatisticsBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    rosTopics: state.rosTopics
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ topicSubscribe: topicSubscribe }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatisticsBoard));
