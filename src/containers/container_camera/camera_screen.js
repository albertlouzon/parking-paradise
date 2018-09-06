import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '@material-ui/core/Grid';
import { onClickHideView ,lowAlert,getCameraSource} from '../../actions/index'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import SmallAlert from '../../components/alerts/low_alerts'


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const styles = theme => ({
    root:{
        position:'fixed',
        bottom:0,
        right:0,
        width:'100vw'
    },
    screen: {
            width: '200%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -10,
            backgroundColor:'rgba(0,0,0,0.1)'
    },
    defaultScreen: {
        height: "50vh",
        width: "100%",
        border: 'grey solid 2px',
        backgroundImage: 'url(../../../public/img/logo_mixed.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    carousel: {
        height: "50vh",
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'ghostwhite',
        backgroundColor: '#ffee33',
        backgroundImage: 'url(../../../public/img/logo_mixed.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    }


})




class CameraScreen extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        value: 0,
        cameraSrc : 'put default image here'
      };
    componentWillMount() {
        this.props.getCameraSource()
    }

    //we need to know if the browser could GET the src in order to know whether we should display the screen component or the default view
    checkImageSource(imageSrc, isStream) {
        var img = new Image();
        img.onload ? isStream = true : isStream = false
        img.onerror ? isStream = false : isStream = true
        img.src = imageSrc
    }

    //Only Mobile view : handle the src change on clicking on another camera type
    handleChange = (event, value) => {
        const { classes } = this.props;

        this.setState({ value,
            cameraSrc : this.props.camera[value].path});
      };
    

    renderMobileView() {
        const { classes } = this.props;
        const { value,cameraSrc } = this.state;
    
        return (
            <div>
          <div className={classes.screen}>
            <img style={{height:'100%',width:'50%'}} src={cameraSrc} alt='no camera source'/>
          </div>


          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
            className={classes.root}
          >
          {this.props.camera.map((camera,i)=>{
              return (
                <BottomNavigationAction label={camera.title}  icon={camera.icon} />

              )
          })}
          </BottomNavigation>
          </div>
        );
      
    }

    //should be called renderDesktopView()
    renderScreen() {
        const { classes } = this.props;
        let front_camera_src = this.props.camera[0].path
        let thermal_camera_src = this.props.camera[1].path
        
        return this.props.camera.map((camera, i) => {
            let isStream = false
            let camera_src = camera.path
            this.checkImageSource(camera_src, isStream)
       
            if (camera.title == 'main_frontcam' || camera.title == 'IR'|| camera.title == 'second_frontcam') {
                return (
                    isStream ? //if the source is loaded, then render this :
                        <div key={camera.title}>
                            <div style={{ display: this.props.displayCamera, flexFlow: 'column nowrap', justifyContent: 'center', width: '50%' }}
                            >
                                <img className={classes.screen} src={camera_src} alt={this.props.camera.title}></img>
                            </div>
                        </div>
                        :
                        
                        <div key={camera.title} style={{ display: this.props.displayCamera, flexFlow: 'column nowrap', justifyContent: 'center', width: '50%' }}
                        >
                            <img className={classes.defaultScreen} src={camera_src} alt={this.props.camera.title}></img>
                        </div>
                )
            }
        })

    }


    render() {
        const { classes } = this.props;
        return (
            <Grid >
                <Hidden smDown>
                    <Grid container direction='row' justify='center' alignItems='center'>
                        {this.renderScreen()}
                    </Grid>
                </Hidden>

                <Hidden mdUp>
                    <Grid>
                        {this.renderMobileView()}
                    </Grid>
                </Hidden>
                <SmallAlert/>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        displayCamera: state.actionCamera,
        camera: state.cameraView,
        rasberryPi: state.rasberryPi
    }

}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onClickHideView: onClickHideView,
        getCameraSource: getCameraSource,
        lowAlert:lowAlert
    }, dispatch)
}




CameraScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CameraScreen))
