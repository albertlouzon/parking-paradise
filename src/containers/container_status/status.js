import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { topicSubscribe , getUptimeAndTemp} from '../../actions/index'
import { srvAnomaly } from '../../actions/index'
import { checkIfAnomaly,onClickingMission,onCancelingMission,lowAlert } from '../../actions/index'
import { getWaypoint } from '../../actions/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
var alarm = new Audio('../../../public/sounds/alarm.mp3')


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class StatusView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            completed: 0
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)

    }
    timer = null
    missionProgressDigit = 0


    handleClose() { //closes the modal
        this.setState({ open: false })
    }
    handleClickOpen() { //opens the modal
        this.setState({
            open: true
        })
    }
    componentDidMount() {
        this.progress()
        this.timer = setInterval(this.progress, 2500);
    }

    
    componentWillUnmount() {
        this.props.onClickingMission()
        clearInterval(this.timer);
    }


    componentWillMount() {
        this.props.topicSubscribe('/indoor/status', 'indoor_msgs/Status')
        this.props.checkIfAnomaly()
        this.props.getWaypoint()
    }

    //this function is responsible for updating the progress Bar of the current mission. One update every 2500 ms is the actual rate at the moment
    progress = () => {
        let flag = true
        const { completed } = this.state;
        let waypointCurrentIndex = this.props.waypointTopic[0].currentWaypointIndex || 0
        let waypointTotal = this.props.waypointTopic[0].numberOfWaypoints || 1
        const missionProgressDigit = Math.round(100 * (waypointCurrentIndex / waypointTotal))

        if (completed === 100) { //completer==100 means that the mission is completed. Here we are resetting the values.
            if(missionProgressDigit>=100 ){
                flag = false
                
            } 
            else{
                this.props.lowAlert({
                    description:'Mission successfully completed',
                    open: true
                })
                this.props.onCancelingMission()
                flag = true

            }
            this.setState({ completed: 0 });
        } else {
            if(flag==true){
                this.setState({ completed: missionProgressDigit });
            }
   
        }
    };
    render() {
        var x = <span>loading status...</span>
        var y = <span></span>
        let missionProgressDigit
        let image_anomaly = '../../../../../robot/anomaly.jpg'
        let missionProgress
        let waypointDescription = this.props.waypointTopic[0].description || undefined   //here we set up upTime, temperature and freeRam of drone and station
        let waypointDistance = this.props.waypointTopic[0].distanceToWaypoint || 0
        let waypointCurrentIndex = this.props.waypointTopic[0].currentWaypointIndex || 0
        let waypointTotal = this.props.waypointTopic[0].numberOfWaypoints || 1 //if undefined, then equals to 1 in order not to divide by 0
        let n = waypointTotal
        let i = waypointCurrentIndex
        let d = waypointDistance
        missionProgressDigit = Math.round(100 * (i / n))
        missionProgress = Math.round(100 * (i / n)) + '%'
        

        if (!this.props.rosTopics[0].droneConnected == true) { //first of all we check if the drone is connected
            if (this.props.rosAnomalies[0]) { //then check if  an anomaly is detected
                this.state.open = true
                x = <span style={{ color: '#cc0000' }}>Anomaly detected</span>
                y = <span />
            }
            else { //if no anomaly, we check which mission is currently active
                (this.props.mission_mutation)
                if(this.props.mission_mutation=='no mission'){ //if no mission active, render according to droneConnected and isFlying booleans
                        x = <span style={{ color: 'lightgreen' }}>Drone connected </span>
                        if (this.props.rosTopics[0].isFlying == true) {
                            y = <span style={{ color: 'lightgreen' }}>and flying</span>
                        } else {
                            y = <span style={{ color: 'lightgreen' }}>and landed</span>
                        }

                }else{
                    x = <span>Current Mission:   <span style={{ color: '#D59AFD' }}>{this.props.mission_mutation}</span> </span>

                }
               
            }

        } else {
            x = <span style={{ color: '#cc0000' }}>Drone disconnected</span>
        }

        return (
            <span>
                <span>
                    <span>{x}</span>
                    <span>{y}</span>
                </span>

                <span style={{ paddingLeft: '3vh' }}>
                    {/* check if there is a current mission. If yes, display the mission name and its current progress (currentIndex/total) */}
                    <span>{this.props.mission_mutation == 'no mission' ?  null : missionProgress}</span> 
                    <LinearProgress color="secondary" variant="determinate" value={this.state.completed} />

                </span>




                    {/* This is a modal and should be generalized into a pure function, located in actions/index.js */}
                <Dialog 
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{  textAlign:'center' }} id="alert-dialog-slide-title">
                        <span style={{color: '#cc0000',}}> {'ANOMALY DETECTED !'}</span>
                    </DialogTitle>
                    <DialogContent style={{display:'flex',justifyContent:'center'}}>
                        <img src={image_anomaly} alt='no anomaly image' style={{ height: '50%', width: '50%' }} />
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.rosAnomalies[0] ?
                                <div>
                                    <DialogContentText>Object hit:   <span style={{ color: '#D59AFD' }}>{this.props.rosAnomalies[0].object}</span></DialogContentText>
                                    <DialogContentText>Temperature:   <span style={{ color: '#D59AFD' }}>{this.props.rosAnomalies[0].temperature} Degrees</span></DialogContentText>
                                    <DialogContentText>Location:   <span style={{ color: '#D59AFD' }}>{this.props.rosAnomalies[0].location}</span></DialogContentText>
                                </div>
                                : <DialogContentText>loading...</DialogContentText>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { window.location.reload() }} style={{ color: 'lightgreen' }}>
                            Dismiss
              </Button>
                        <Button onClick={() => { this.props.srvAnomaly('/indoor/nav/pause', 'indoor_msgs/NavSrv') }} style={{ color: 'yellow' }}>
                            Investigate further
              </Button>
                        <Button onClick={() => { this.props.srvAnomaly('/indoor/nav/pause', 'indoor_msgs/NavSrv') }} style={{ color: '#cc0000' }}>
                            Call emergency
              </Button>
                    </DialogActions>
                </Dialog>
            </span>
        );
    }
}



function mapStateToProps(state) {
    return {
        rosTopics: state.rosTopics,
        rosAnomalies: state.rosAnomalies,
        waypointTopic: state.waypointTopic,
        mission_mutation : state.mission_mutation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        topicSubscribe: topicSubscribe,
        srvAnomaly: srvAnomaly,
        checkIfAnomaly: checkIfAnomaly,
        getWaypoint: getWaypoint,
        onClickingMission : onClickingMission,
        lowAlert:lowAlert,
        onCancelingMission :onCancelingMission
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusView);
