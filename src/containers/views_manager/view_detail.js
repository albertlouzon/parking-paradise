//overriding style...

import React, { Component } from 'react'
import { connect } from "react-redux";
import CameraView from '../container_camera/camera_screen'
import MissionView from '../../components/missions_view'
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import MapView from '../../components/map_view'


//this is what is rendered when the user clicks on a type of view. It is rendered according to the type of view he clicked on.
class ViewDetail extends Component {
    render() { 
        if(!this.props.view){ //if nothing was clicked, then render this default view
            return (
                <Grid container display='flex' justify='center' >
                                <Hidden smDown>
            
                  <div style={{height:'40vh',
                        width:'250vh',
                        marginTop:"7vh",
                        backgroundImage:'url(../../../public/img/logo_mixed.png)',
                        backgroundSize:'contain',backgroundPosition:'center' ,
                        backgroundRepeat:'no-repeat',
                        opacity:'0.8'   }}></div>
                        </Hidden>
                </Grid>
            )
        }
        else if(this.props.view.name=='Camera'){
            return(
                <CameraView/>
        )}
        else if (this.props.view.name=='Missions'){
            return (
                <MissionView/>
            )
        }
        else if (this.props.view.name=='Map'){
            return (
                <MapView/>
            )
        }
        

       else {
            return ( 
                <Grid container display='flex' justify='center' >
                                <Hidden smDown>

                  <div style={{height:'40vh',
                        width:'250vh',
                        marginTop:"7vh",
                        backgroundImage:'url(../../../public/img/logo_mixed.png)',
                        backgroundSize:'contain',backgroundPosition:'center' ,
                        backgroundRepeat:'no-repeat',
                        opacity:'0.8'   }}></div>
                        </Hidden>
                </Grid>
                
             );
        }
       
    }
}

function mapStateToProps(state){
    return {view : state.activeView}
}

 
export default connect(mapStateToProps)(ViewDetail)