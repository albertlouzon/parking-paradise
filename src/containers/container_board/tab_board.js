import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import ScrollIcon from '@material-ui/icons/SwapVert';
import green from '@material-ui/core/colors/green';


import MissionList from '../../containers/container_missions/mission_list'
import Statistics from './statistics'

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    position: 'relative',
    minHeight: 100,
    maxHeight:'12vh',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  }
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    
    const MissionListScreen = <MissionList/>

    const fabs = [
      
      {
        color: 'secondary',
        className: classes.fab,
        icon: <ScrollIcon onClick={()=>{MissionListScreen.scr}}/>,
      }
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            onClose={tjos.state.completed}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            fullWidth
          >
            <Tab label="Infos" />
          </Tabs>
        </AppBar>
        <div
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
                <Statistics/>
          </TabContainer>
        </div>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Button>
            </Button>
          </Zoom>
        ))}
      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);