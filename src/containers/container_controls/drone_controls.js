import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { startMission,toggleStatus,lowAlert,highAlert } from '../../actions/index'
import { bindActionCreators } from 'redux'
import HighAlert from '../../components/alerts/high_alert'
import SmallAlert from '../../components/alerts/low_alerts'
import FlightLand from '@material-ui/icons/FlightLand'
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import PanTool from '@material-ui/icons/PanTool'
import LibraryAdd from '@material-ui/icons/LibraryAdd'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
let flag = false


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    roundBtn: {
        margin: theme.spacing.unit,
    },
   
   
    
});
var isDroneMoving = false

class ControlItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            openMenu: false,
            anchorElo: null,
            openWar: false,
            modalo: false,
        }
        this.stopDrone = this.stopDrone.bind(this)
    }

    componentWillMount() {
        this.props.toggleStatus()
    }

    handleClickOpenModalo = (mission) => {
        this.setState({ modalo: true });
    };

    handleCloseModalo = () => {
        this.setState({ modalo: false })
    }

    handleClickOpen = (mission) => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    handleClickMenu = event => {
        this.setState({ anchorElo: event.currentTarget });
    };

    onClickingDropdown = () => {
        this.openWarningModal()
    }


    handleCloseMenu = () => {
        this.setState({ anchorElo: null });
    };

    openWarningModal = () => {
        this.setState({ openWar: true });
    };
    closeWarningModal = () => {
        this.setState({ openWar: false });
    };


    stopDrone() {
        if (this.props.rosTopics[0].droneConnected == true) {
            this.props.startMission('STOP', 0)
            this.handleClickOpen()
            this.props.missions.map(mission => {
                this.props.toggleStatus(mission.status.isActive)
            }
            )
            this.props.startMission('ReturnHome', 0)
             //Even if the drone is not connected the 'return home' mission will still be invoked... (do we want that ?)
        }
        else { this.props.lowAlert({
            description:'Please check the connection of the drone',
            open:true
        }) }
    }

    landingInterval(isflying, bool) { //disable the button when the droone is switching from land to takeOff (et reciprooquement)                                       
        if (bool == true) { negBool = false } else { negBool = true }
        if (!isflying == bool) {
            isFlying = negBool
            return true
        }
        else { return false }
    }

    onClickingMission(name, type, code) { //differenciate takeOff
        if (name.land || name.takeOff) {

            if (this.props.rosTopics[0].isFlying == true) {
                this.props.startMission("land", code)
            }
            else if (this.props.rosTopics[0].isFlying == false) {
                this.props.startMission(type.takeOff, code)
            }
            else { console.log('I dont see Land neither Take Off. the drone is probably disconnected') }
        } else {
            this.props.startMission(type, code)
        }

    }

    renderControlItems() {
        const { classes } = this.props;
        return this.props.controlItems.map((item) => {
            let dynamicName
            let dynamicIcon
            if (!item.name.land) {
                dynamicName = item.name
                dynamicIcon = item.menuIcon
            } else { 
                //To disable this button when the drone is operating land/TakeOff, create a flag.
                if (this.props.rosTopics[0].droneConnected == false || !this.props.rosTopics[0].droneConnected) {
                    dynamicName = 'Take-Off'
                    dynamicIcon = item.menuIcon
                    item.style.disabled = true
                }
                else if (this.props.rosTopics[0].isFlying == true) {
                    dynamicName = item.name.land
                    dynamicIcon = <FlightLand />
                    item.style.disabled = false


                } else if (this.props.rosTopics[0].isFlying == false) {
                    dynamicName = item.name.takeOff
                    dynamicIcon = <FlightTakeoff />
                    item.style.disabled = false

                }
            }
            const { anchorElo } = this.state;
            const openMenu = Boolean(anchorElo);
            return (
                <Grid key={item.missionType} container direction='column' justify='center' alignItems='stretch' className={classes.controlsContainer}>
                    <Button onClick={() => { this.onClickingMission(item.name, item.missionType, item.missionCode) }}
                        variant={item.style.variant} size={item.style.size} color={item.style.color} disabled={item.style.disabled}
                        className={classes.button}>
                        <div>{dynamicIcon}</div>                                                                                                                                         
                        {dynamicName}
                    </Button>

                    <Button className={classes.button} onClick={() => { this.stopDrone() }}
                        variant='contained' color='secondary' size='large'>
                        <PanTool />
                        STOP
                        </Button>
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            <span style={{ color: '#D59AFD' }}> {'Canceling mission...'}</span>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Sentinel will return to the Base-Station.
                  </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Ok
                  </Button>
                        </DialogActions>
                    </Dialog>

                    <Button className={classes.button}
                        variant='contained' color='secondary' size='large'
                        aria-owns={open ? 'fade-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClickMenu}
                    >
                        <LibraryAdd />
                    </Button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorElo}
                        open={openMenu}
                        onClose={this.handleCloseMenu}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => {
                            this.onClickingMission('Patrol', 'Patrol', 0)
                            this.handleClickOpenModalo()
                        }} >Patrol</MenuItem>
                        <MenuItem onClick={this.onClickingDropdown}>Fire drill</MenuItem>
                        <MenuItem onClick={this.onClickingDropdown}>Looping</MenuItem>

                        {/*this is a modal and should be generalized in actions/index.3js */}
                        <Dialog
                            open={this.state.openWar}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.closeWarningModal}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                <span style={{ color: '#cc0000' }}> {'Not available'}</span>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    This feature is still in development stage
                  </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closeWarningModal} color="secondary">
                                    Ok
                  </Button>
                            </DialogActions>
                        </Dialog>

                    </Menu>
                </Grid>

            )
        })
    }

    render() {
        const { classes } = this.props;
        return (

            <Grid container direction='column' alignItems='stretch'>
                {this.renderControlItems()}

             {/*this is a modal and should be generalized in actions/index.3js */}
                <Dialog
                    open={this.state.modalo}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseModalo}
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
                        <Button onClick={this.handleCloseModalo} color="secondary">
                            Ok
          </Button>
                    </DialogActions>
                </Dialog>
                <SmallAlert/>
                <HighAlert/>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        controlItems: state.controlItems,
        rosTopics: state.rosTopics,
        missions: state.missions,
        statuses: state.statuses
    }

}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startMission: startMission,
        toggleStatus: toggleStatus,
        lowAlert:lowAlert,
        highAlert:highAlert
    }, dispatch)
}




ControlItems.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ControlItems))
