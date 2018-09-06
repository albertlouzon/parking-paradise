import React from 'react';
import BatteryAnomaly from '@material-ui/icons/BatteryUnknown';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import BaseStationIcon from '@material-ui/icons/Vignette';

import SettingsIcon from '@material-ui/icons/SettingsCell';


export default function() {
    return [   
        {name: 'Base Station', menuIcon:<BaseStationIcon/>},

        {name: 'Drone', menuIcon:<BatteryAnomaly/>},
        // {name: 'Settings' , menuIcon:<SettingsIcon/>},
        // {name: 'Shutdown' , menuIcon:<PowerIcon/>}
    ] 
}

