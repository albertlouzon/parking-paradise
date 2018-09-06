import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import  BottomNodeList from './side_menu_bot_nodes';
import TopNodeList from './side_menu_views'


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left:false
  };

  toggleDrawer = (side, open) => () => { //the function that opens and closes the side bar. Ex: on clicking a view type, it closes the side bar.
    this.setState({
      [side]: open,
    });
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List><TopNodeList/></List> 
        <Divider />

      </div>
    );

    const fullList = (
      <div className={classes.fullList}>

        <Divider />
        <List><BottomNodeList/></List>
      </div>
    );

    return (
      <div>
        <div onClick={this.toggleDrawer('left', true)}>
            <MenuIcon/>
        </div>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
        <div onClick={this.toggleDrawer('left', false)}>
              {sideList}
        </div>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {fullList}
          </div>
          <Grid container display='flex'  justify='center' alignItems='stretch' style={{marginTop:'2vh'}}>
          <div style={{height:'12vh',
                        width:'17vh',
                        backgroundImage:'url(./../../public/img/indoor-logo-white.png)',
                        backgroundSize:'cover',backgroundPosition:'center' ,
                        backgroundRepeat:'no-repeat',
                        }}></div>
          </Grid>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);