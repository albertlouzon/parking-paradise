import React from 'react';
import Flight from '@material-ui/icons/Flight';
import Visibility from '@material-ui/icons/Visibility';
import Home from '@material-ui/icons/Home';


export default function() {
    return [   
        {name: {land:'Land',takeOff:'Take-Off'}, style:{variant:'contained',size:'large',color:'secondary',disabled:false}, isLanded:true,missionType:{land:'land',takeOff:'Takeoff'},missionCode:0, menuIcon:<Flight/> },
        //{name: 'Go Base', style:{variant:'contained',size:'small',color:'secondary'},missionType:'ReturnHome',missionCode:0, menuIcon:<Home/>},
        //{name: 'Check 360', style:{variant:'contained',size:'small',color:'secondary'},missionType:'360' ,missionCode:0, menuIcon:<Visibility/>},
    ] 
}

