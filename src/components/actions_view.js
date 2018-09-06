import React from 'react';
import DroneControls from '../containers/container_controls/drone_controls'


//It is probable that I had a bad understanding of the differenciation between Cmponents (static UI entities) annd Containers (dynamic UI entities)
//Exept App.ja the other files seem useless
function ButtonSizes(props) { 
  const { classes } = props;
  return (
    <DroneControls/>
  );
}


export default ButtonSizes