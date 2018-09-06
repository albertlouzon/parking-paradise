import React from 'react';
import PatrolIcon from '@material-ui/icons/Nfc';
import ScanIcon from '@material-ui/icons/TrackChanges';
import SentinelIcon from '@material-ui/icons/GpsFixed';
import MappingIcon from '@material-ui/icons/Landscape';


export default function() {
    return [   
        {name: 'Patrol', color:'primary',icon : <PatrolIcon/>,missionType:'Patrol', status:{isAvalaible:true,isActive:false, estimatedTime:15} },
        {name: 'Plan',  color:'primary',icon : <SentinelIcon/>, missionType:'Plan' , status:{isAvalaible:true,isActive:false, estimatedTime:20}}, //the typo error is on purpose here.
        {name: 'Quick Scan', color:'primary',icon : <ScanIcon/>,missionType:'QuickScan', status:{isAvalaible:true,isActive:false, estimatedTime:1}},
        {name: '360° Mapping', color:'primary',icon :<MappingIcon/>,missionType:'Map', status:{isAvalaible:true,isActive:false, estimatedTime:10}},
    ] 
}

