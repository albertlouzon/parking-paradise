import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TempIcon from '@material-ui/icons/WbSunny';
import AltitudeIcon from '@material-ui/icons/TrendingUp';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { topicSubscribe } from '../../actions/index'
import { getWaypoint } from '../../actions/index'




const styles = theme => ({
  root: {
    paddingLeft: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  divider: {
  }
});

class DataBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.topicSubscribe('/indoor/status','indoor_msgs/Status');
    this.props.getWaypoint()
  
  }
  

  render() {
    const { classes } = this.props;
    let temp = this.props.upTimeTopic[0].systemHealthData || undefined
    if(!temp==undefined){
      temp = temp.temperature
    } 
    let altitude = this.props.rosTopics[0].altitude || 'no data'  
    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <Avatar style={{ backgroundColor: '#D59AFD' }}>
              <TempIcon />
            </Avatar>
            <ListItemText primary="Drone temperature" secondary={temp} />
            
          </ListItem>
          <li>
            <Grid item xs={11}>
              <Divider inset className={classes.divider} />
            </Grid>
          </li>
          <ListItem>
            <Avatar style={{ backgroundColor: '#D59AFD' }}>
              <AltitudeIcon />
            </Avatar>
            <ListItemText primary="Altitude" secondary={altitude} />
          </ListItem>

          <Grid item xs={11}>
            <Divider inset component="li" />
          </Grid>
        </List>
      </div>
    );
  }
}


DataBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    rosTopics: state.rosTopics,
    waypointTopic : state.waypointTopic,
    upTimeTopic : state.upTimeTopic
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    topicSubscribe: topicSubscribe,
    getWaypoint : getWaypoint
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DataBoard));

