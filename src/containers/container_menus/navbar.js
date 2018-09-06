import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import {topicSubscribe} from '../../actions/index'
import {openModal,getUptimeAndTemp,lowAlert} from '../../actions/index'

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from '@material-ui/core/Grid';
import ViewList from '../views_manager/view-list';
import {bindActionCreators} from 'redux'
import StatusView from '../container_status/status'
import { Hidden } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import SideBar from './side_bar/side_bar'
import BatteryCharging20 from '@material-ui/icons/BatteryCharging20';
import BatteryCharging50 from '@material-ui/icons/BatteryCharging50';
import BatteryCharging60 from '@material-ui/icons/BatteryCharging60';
import BatteryCharging80 from '@material-ui/icons/BatteryCharging80';
import BatteryFull from '@material-ui/icons/BatteryFull';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize : 1,

  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  flex: {
    justify:'space-between',
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navBarItems: {
    textAlign: 'center',
  },
  searchBar : {
    width:'80%'
  },
  batteries : { 
    textAlign : 'center',
  },
  box:{
   padding:0,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}



class MenuAppBar extends React.Component {
  constructor(props){
    super(props)
   this.onInputChange = this.onInputChange.bind(this)
   this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  state = {
    auth: "ziejfzifj",
    anchorEl: null,
    term : '',
    closeModal:false,
    openAlert:false
  };
  componentWillMount() {
    this.props.topicSubscribe('/indoor/status','indoor_msgs/Status');
    this.props.openModal();
    this.props.getUptimeAndTemp()
}

handleClickOpenAlert = () => {
  this.setState({ openAlert: true });
};

handleCloseAlert = () => {
  this.setState({ openAlert: false });
};

handleCloseModal = () => {
  this.setState({ open: false });
};

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  onInputChange(event){
    this.setState({ term: event.target.value });
}
onFormSubmit(event){
  event.preventDefault

}


renderBatteryIcons(){ 
  return this.props.botMenuNodes.map((node)=>{
    let batteryItem
    let batteryIcon
    var batteryIndicator = undefined
    var batteryNumber = 100
    if(node.name == 'Drone'){
        batteryNumber = this.props.rosTopics[0].batteryLevel ||  'disconnected'
        batteryIndicator = batteryNumber + '%'
       
        if(batteryNumber>=70 && batteryNumber<=90){
            node.menuIcon = <BatteryCharging80/>
        }
        else if(batteryNumber>=50 &&batteryNumber<70){
            node.menuIcon = <BatteryCharging60/>
        }
        else if(batteryNumber>=20 &&batteryNumber<50){
            node.menuIcon = <BatteryCharging50 style={{color:'red'}}/>
            this.props.lowAlert({
              description:'Drone Battery is low',
              open:true
            })
        } else if(batteryNumber>=0 &&batteryNumber<20){
            node.menuIcon = <BatteryCharging20 style={{color:'red'}}/>
        }else{
            node.menuIcon = <BatteryFull style={{color:'lightgreen'}}/>
        }
       
       
    }else if (node.name == 'Mobile'){
        batteryNumber = this.props.rosTopics[0].fmBatteryLevel
        batteryIndicator = this.props.rosTopics[0].fmBatteryLevel + '%'
        if(batteryNumber>=70 &&batteryNumber<=90){
            node.menuIcon = <BatteryCharging80 />
        }
        else if(batteryNumber>=50 &&batteryNumber<70){
            node.menuIcon = <BatteryCharging60/>
        }
        else if(batteryNumber>=20 &&batteryNumber<50){
            node.menuIcon = <BatteryCharging50/>
        } else if(batteryNumber>=0 &&batteryNumber<20){
            node.menuIcon = <BatteryCharging20 style={{color:'red'}}/>
        }else{
            node.menuIcon = <BatteryFull/>
        }

    }
    else{
        batteryIndicator =  null
    }
 
    if(node.name == 'Drone'){
      batteryIcon = node.menuIcon
    }
    return(
            <span style={{fontSize:'12px',padding:'2vh'}} key={node.name}>
            {batteryIndicator}
           <br/>
            {batteryIcon}
            </span>
            
       )
})
}


  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let droneBattery = this.props.rosTopics[0].batteryLevel
    if(droneBattery==undefined){
      this.handleClickOpenAlert//broken
    }
    return (
      <Grid item xs={12}> 
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <SideBar/>
            </IconButton>
            <Hidden smDown>
            <Grid item xs={4}>
            <Typography variant="title" className={classes.flex}>
              <ViewList/>
            </Typography>
            </Grid>
            </Hidden>

            <Grid container item xs={6} direction='row'>
            <Typography>
                <StatusView/>
            </Typography>
            </Grid>

            {this.renderBatteryIcons()}

           
          </Toolbar>
        </AppBar>
        <Dialog
           open={this.state.openAlert}
           TransitionComponent={Transition}
           keepMounted
           onClose={this.handleCloseAlert}
           aria-labelledby="alert-dialog-slide-title"
           aria-describedby="alert-dialog-slide-description"
         >
           <DialogTitle id="alert-dialog-slide-title">
             <span style={{color:'#cc0000'}}>{"Critical drone battery !"}</span>
           </DialogTitle>
           <DialogContent>
             <DialogContentText id="alert-dialog-slide-description">
                  The battery is under 50%... Sentinel is returning to Base-Station.
                  It will cancel the current mission.
             </DialogContentText>
           </DialogContent>
           <DialogActions>
             <Button onClick={this.handleCloseAlert} color="secondary">
               Go Base
             </Button>
           </DialogActions>
         </Dialog>
      </Grid>
    );
  }
}


MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



function mapStateToProps(state) {
  return {
        botMenuNodes : state.botMenuNodes,
        rosTopics : state.rosTopics,
        upTimeTopic : state.upTimeTopic

  } 
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    topicSubscribe: topicSubscribe,
    openModal : openModal,
    getUptimeAndTemp : getUptimeAndTemp,
    lowAlert:lowAlert,  

  }, dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MenuAppBar)); //name of the r.component u wanna connect