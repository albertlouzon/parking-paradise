//IMPORTANT : All the objects that are retrieved from the drone appear in an array, even if there is only one element.
//This is why you will often sth like this.props.rosTopic[0].attribute. 


//right now many files are polluted by the implementation of modals. Modals should be generalized in a Redux pure function, like I did for LowAlert()
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import ViewDetail from '../containers/views_manager/view_detail'
import NavBar from '../containers/container_menus/navbar'
import ControlList from './actions_view'
import ROSLIB from 'roslib'
import { Hidden } from '@material-ui/core';
import DataList from '../containers/container_board/data_list'

//these 2 lines are not React. Here its pure vanilla DOM manipulation. 
document.body.style.backgroundColor = '#282828';
document.body.style.fontFamily = 'Rubik';



var ros = new ROSLIB.Ros({
  url: 'ws://10.42.0.1:9090'
});
ros.on('connection', function () {
  console.log('websocket connection is successful')
})
ros.on('error', function (error) {
  console.log('websocket connection failed. Error: ', error)
})
ros.on('close', function () {
  console.log('connection to server closed')
})

const theme = createMuiTheme({
  palette:{
    type:'dark',
    primary: {main:'rgba(0, 0, 0, 0.5)'}, //ffef62
    secondary:{main:'#D59AFD'}
  },
  typography: {
    "fontFamily": "\"Rubik\", sans-serif",
    "fontSize": 16,
   }
});

//for each file with the const styles, create a sub-file called <fileName>_css and export this object.

const styles = theme => ({ 
  root: {
    flexGrow: 4,
    fontFamily:'Rubik'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
 
  statusView: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',

  },
  currentView: {
    height: theme.spacing.unit * 40,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing.unit * 30,
    },
  },
  bigBox:{
    [theme.breakpoints.down('sm')]: {
      display:"flex",
      justify:'space-around',
    },
   

  },
  controlsBtn:{
    width:'85vw',
    [theme.breakpoints.down('sm')]: {
      position:'absolute',
      bottom:0
      
    },
  },
  
});

function AutoGrid(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>  {/* MuiThemeProvider is the material-ui tool to generate a theme for the all app */}
    <Grid item xs={12} container direction="column"
      justify="space-around"
      alignItems="stretch" className={classes.bigBox}>

      <NavBar/> 

      <Grid container direction="row"
      justify="center"
      alignItems="center">
        <Grid item xs={10} style={{paddingLeft:24}}>

        <ViewDetail/>

        </Grid>
        <Grid item xs={2}>

        <ControlList/>

        </Grid>
      </Grid>

      <Grid container  direction="row"
      justify="space-between"
      alignItems="center" className={classes.controlsBtn}>
        <Hidden mdDown>
            <Grid container direction="row" justify='center'>

            <DataList />
            
            </Grid>
        </Hidden>

      </Grid>

    </Grid>
    </MuiThemeProvider>
   );
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);