import React from 'react';
import CameraScreen from '../containers/container_camera/camera_screen'
import CameraIcon from '@material-ui/icons/Videocam';
import DevToolsIcon from '@material-ui/icons/Build';
import MapIcon from '@material-ui/icons/Map';
import MissionICon from '@material-ui/icons/Assignment';


export default function() {
    return [   
        //TodO : remove content
        {name: 'Camera', content : [<CameraScreen/>,'board','drone_actions'],menuIcon:<CameraIcon/>},
        {name: 'Map',  content : [<img src='https://4.imimg.com/data4/YC/LN/IMOB-49998699/unnamed-png-500x500.png' alt='unknown'/>],menuIcon:<MapIcon/> },
        {name: 'Missions' ,content : ['missions_list','drone_actions'],menuIcon:<MissionICon/>},
        {name: 'Dev Tools' ,content : ['dev_board'],menuIcon:<DevToolsIcon/>}
    ] 
}

