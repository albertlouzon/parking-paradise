//contains all the actions creator that we make
import ROSLIB from 'roslib'


var ros = new ROSLIB.Ros({
    url: 'ws://10.42.0.1:9090'
});

export function selectView(view){
    //selectBook is an action creator. It needs to return an action, an object with a type property
    return{
        type : 'VIEW_SELECTED', //always
        payload : view          //optional (more info on the action that is to be executed)

    };
}

export function openModal(open){
    open = true
    return{
        type : 'OPEN_MODAL', 
        payload : open          
    };
}


//this is the conventional way you should use to define the type.
export const TOOGLE_CAMERA_SCREEN = 'TOOGLE_CAMERA_SCREEN'; 

export function onClickHideView(camera){
    camera = 'none'
    //selectBook is an action creator. It needs to return an action, an object with a type property
    return{
        type : TOOGLE_CAMERA_SCREEN,
        payload : camera
    };
}

export const CLICK_MISSION = 'CLICK_MISSION'

export function onClickingMission(mission,index){
    var miss = Object.assign({},mission)
    return{
        type : CLICK_MISSION,
        payload : miss,
        index : index
    };
}

export function onCancelingMission(mission,index){
    var miss = Object.assign({},mission)
    return{
        type : 'CANCEL_MISSION',
        payload : miss,
        index : index
    };
}



export function topicSubscribe(name,type) { 
    return (dispatch) => {
        var listener = new ROSLIB.Topic({
            ros: ros,
            name: name, 
            messageType: type
        })
        listener.subscribe((result)=> {
            dispatch({type:'ROS_STATUS',payload:result})
                
        })
    }
    
}

export function getWaypoint() {
    return (dispatch) => {
        var listener = new ROSLIB.Topic({
            ros: ros,
            name: '/indoor/status/navigation', 
            messageType: 'indoor_msgs/Waypoint'
        })
        listener.subscribe((result)=> {
            dispatch({type:'ROS_WAYPOINT',payload:result})
                
        })
    }
    
}

export function getUptimeAndTemp() {
    return (dispatch) => {
        
        var listener = new ROSLIB.Topic({
            ros: ros,
            name: '/indoor/monitor/system', 
            messageType: 'indoor_msgs/HealthData' //CHANGE
        })
        listener.subscribe((result)=> {
            dispatch({type:'ROS_UPTIME',payload:result})
                
        })
    }
    
}

export function getCameraSource(name,type) {
    return (dispatch) => {    
        var listener = new ROSLIB.Topic({
            ros: ros,
            name: name, //tepu serait l argument generalisant name et msgType
            messageType: type
        })
        listener.subscribe((result)=> {
            dispatch({type:'CAMERA_SOURCE',payload:result})
                
        })
    }
    
}

export function checkIfAnomaly() {
    return (dispatch) => {
       
    
        var listener = new ROSLIB.Topic({
            ros: ros,
            name: 'indoor/anomaly', 
            messageType: 'indoor_msgs/Anomaly'
        })
        listener.subscribe((result)=> {
            var alarm = new Audio('../../public/sounds/alarm.mp3')
            alarm.play()

            dispatch({type:'ROS_TOPICANOMALY',payload:result})
                
        })
    }
    
}

export function srvAnomaly(name, type) { //when anomaly is detected, invoke this function
    return (dispatch) => {
       
        var anomalyService = new ROSLIB.Service({
        ros: ros,
        name: name,
        serviceType: type
      });
      var serviceRequest = new ROSLIB.ServiceRequest({ //0 for dismissing , 1 to call nav/pause
        code:0
      });
      anomalyService.callService(serviceRequest,(result)=> {
        dispatch({type:'ROS_ANOMALY',payload:result})
        ('Closing  anomaly:  ', serviceRequest ,'  response: ',result)
    })
    }
    
}

export function startMission(missionType, missionCode) {
   
    return (dispatch) => {
       
    
        var missionService = new ROSLIB.Service({
        ros: ros,
        name: "/indoor/mission",
        serviceType: "/indoor_msgs/Mission"
      });
      var serviceRequest = new ROSLIB.ServiceRequest({
        missionType: missionType,
        missionCode : missionCode //we put an arbitrary unit just so that the callback will work.
      });
     
      missionService.callService(serviceRequest,(result)=> {
        dispatch({type:'ROS_MISSION',payload:result})
        console.log('mission params:  ', serviceRequest ,'response: ',result)
    })
    }
    
}

//for the modals
export function highAlert(props){ 
    var description = Object.assign({},props)
    var open = true
    return{
        type : 'HIGH_ALERT',
        payload : description,
        title : payload.title,
        text : payload.text,
        buttons : payload.buttons,
        open : open
    };
}

export function closeHighAlert(props){ //not sure that we have to pass all the properties for this one, since we just care about payload.open to close the modal
    var description = Object.assign({},props)
    return{
        type : 'CLOSE_HIGH_ALERT',
        payload : description,
        title : payload.title,
        text : payload.text,
        buttons : payload.buttons,
        open : false
    };
}


export function lowAlert(props){
    var description = Object.assign({},props)
    var open = true
    return{
        type : 'LOW_ALERT',
        payload : description,
        open : open
    };
}

export function closeLowAlert(props){
    var description = Object.assign({},props)
    return{
        type : 'CLOSE_LOW_ALERT',
        payload : description,
        open : false
    };
}

export function toggleStatus(status){
    status = false
    return{
        type : 'TOGGLE_STATUS',
        payload : status
        }
}
