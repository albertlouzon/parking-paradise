// //In order to create a soft alert, you need to invoke this.props.lowAlert() and import this component.
// // the param to pass are : description (string) and open (bool)
// //ex : this.props.lowAlert({
//              description : 'your text',
 //               open : true
//        })

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import {closeLowAlert} from '../../actions/index'
import { bindActionCreators } from 'redux'


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SmallAlert extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.alertProps.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.alertProps.description}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.closeAlert}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SmallAlert.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        alertProps : state.lowAlertProps
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeAlert : closeLowAlert
    }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SmallAlert));
