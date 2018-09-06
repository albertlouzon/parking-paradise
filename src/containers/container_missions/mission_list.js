import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { topicSubscribe } from '../../actions/index'
import { toggleStatus,onClickingMission,lowAlert } from '../../actions/index'


import Button from "@material-ui/core/Button";
import { startMission } from '../../actions/index'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    width: "80%",
    display: "flex",
    justifyContent: "flex-start"
  }
});

function Transition(props) { //this is the animation applied to all the modals.
  return <Slide direction="up" {...props} />;
}



class MissionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openErr: false
    };
    this.newService = this.newService.bind(this);
    this.missionStarter = this.missionStarter.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  componentWillMount() {
    this.props.toggleStatus()
    this.renderList()
  }

  openDialog() {
    this.setState({
      open: true
    });
  }

  handleClickOpen = (mission) => {
    this.setState({ open: true });
  };

  handleClickOpenErr = () => {
    this.setState({ openErr: true })
  }

  handleCloseErr = () => {
    this.setState({ openErr: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };



  missionStarter(mission, i) {  //the last step before sending the ros request with the mission name and the mission type.
    this.handleClickOpen(mission)
    this.props.onClickingMission(this.props.missions,i)
    this.props.startMission(mission.missionType, 0)
  }



  newService(mission, i) { //here we check if the mission is avalaible and if there is no other mission currently running.
    if (!this.props.rosTopics[0].droneConnected == true) { 
      //TO ERASE WHEN ALL THE MISSIONS ARE AVAILABLE. If you want to add only one mission, write mission.name == 'Patrol' OR '<missionName>'
      if (mission.name == 'Patrol'|| mission.name == 'Plan') { 
        if (mission.status.isActive == true) {
          this.props.lowAlert({    //lowAlert is a global function that display a soft modal. Its code is in actions/index.js
            description : 'This mission is currently active',
            open : true
          })
        } else if (mission.status.isAvalaible == true) {
          var counter = 0;
          this.props.missions.map(mission => {
            if (!mission.status.isActive) {
              counter += 1;
            }
          });
          if (counter == 4) { //counter = 4 means that all the mission are inactive.
            this.missionStarter(mission, i);



          } else {
            this.props.lowAlert({
              description:'The drone can process only one mission at the same time. Please stop the drone to start a new mission',
              open : true
            })
            

          }
        } else { alert('not possible  ')}
      }
      else {
        this.props.lowAlert({
          description:'This mission is still in development stage...',
          open : true
        })
      }

    }
    else {
      this.handleClickOpenErr()
    }
  }

  //loop through reducer_missions.js to render the list of missions
  renderList() {
      this.props.missions.map((mission)=>{
        mission.status.isActive = false
        mission.color = 'primary'
      })
    var activeMission = this.props.mission_mutation
    if(activeMission=='Patrol'){  //check which mission is active.
      this.props.missions[0].status.isActive = true
      this.props.missions[0].color = 'secondary'
    }
    else if (activeMission=='Plan'){  //check which mission is active.
    
      this.props.missions[1].status.isActive = true
      this.props.missions[1].color = 'secondary'
    }
   
    const { classes } = this.props;

    return this.props.missions.map((mission, i) => {
      var modal
      //this is only for displaying a modal. it should be generalized inside actions/index.js. Here t should look like this.props.modal({title:'',...,data:''})
      if (mission.name == 'Patrol') {
        modal = <Dialog 
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <span style={{ color: '#D59AFD' }}> {'Mission started'}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              The Sentinel will now start <span style={{ color: '#D59AFD' }}>Patrol</span> mission
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      }
      return (
        <div key={mission.name}>
          <Button
            key={mission.name}
            onClick={() => this.newService(mission, i)}
            variant="contained"
            color={mission.color}
            className={classes.button}
          >
            <Grid >{mission.icon}</Grid>
            <Grid style={{ marginLeft: '50px' }}> {mission.name} </Grid>
          </Button>
          {modal}
          <Dialog
            open={this.state.openErr}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseErr}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              <span style={{ color: '#cc0000' }}> {'Drone disconnected'}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Please connect the Sentinel in order to start a mission.
      </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseErr} color="secondary">
                Ok
      </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    });
  }

  //onClick={this.newService(mission.missionType)}

  render() {
    return <div style={{ display: "inherit" }}>{this.renderList()}</div>;

  }
}




function mapStateToProps(state) {
  return {
    missions: state.missions,
    actionMissions: state.actionMissions,
    actionCamera: state.actionCamera,//wtf
    rosTopics: state.rosTopics,
    mission_mutation: state.mission_mutation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startMission: startMission,
    topicSubscribe: topicSubscribe,
    toggleStatus: toggleStatus,
    onClickingMission:onClickingMission,
    lowAlert:lowAlert
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MissionsList));
