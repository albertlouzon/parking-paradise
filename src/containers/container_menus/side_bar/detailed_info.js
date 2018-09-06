import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//this is the rendered view of the two dropdowns inside the side-bar.

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SystemInfo extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title
        this.content = this.props.content
        this.state = {  };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{this.props.title}</Typography> {/* the name of the environment (drone or station) */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                {this.props.content}   {/* the list of attributes (upTime, temperature, freeRam) */}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
    }
}


SystemInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SystemInfo);