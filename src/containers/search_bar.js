//For now it has been removed from the app but I let it here if the app need a SearchBar later on
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height:'900px'
    },
  });
  

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term : ''};
    }

    onInputChange(event){
        console.log(event.target.value)
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.root}>
            <form>
                <input 
                    value={this.state.term}
                    onChange={this.onInputChange} />
                <button type='submit'>Submit</button>
            </form>
            </Grid>
        );
    }
}

export default withStyles(styles)(SearchBar);