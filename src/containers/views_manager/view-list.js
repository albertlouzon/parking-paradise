//here you will find detailled comments about how redux works. See the bottom of this file.

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import {selectView} from '../../actions/index'
import {bindActionCreators} from 'redux' 
 import TextField from '@material-ui/core/TextField';
 import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
const styles = theme => ({
    root: {
      width: 'auto',
      overflowX: 'auto',
    },
    table: {
        height:'auto'
    },
  });
  let activeView


//List of the different type of view (camera,map,missions,settings)
class ViewList extends Component {
    constructor(props) {
        super(props);
        this.onSelectingView = this.onSelectingView.bind(this)
    }
    onSelectingView(view){
        this.props.selectView(view)
    }
    renderList(){
        return this.props.view.map((view)=>{
            return(
                    <Button  style={{fontSize:'16px'}}  xs={6} md={2} lg={2}  color={activeView}
                        onClick={() => this.onSelectingView(view)} key={view.name}>{view.menuIcon}</Button>
               )
        })
    }
    
    render() {
        return (
            <Grid container spacing={8}>
                    {this.renderList()}
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    //Whatever is returned will show up as props
    //inside ViewList component
    //if our state ever changes, this container will instantly re-render
    return {view : state.views} //the glue between redux and our react container


}

//anything returned from this function will end up as props on the ViewList container
function  mapDispatchToProps (dispatch){
    //Whenever selectBook is called, the result should be passed to all our reducers
    return bindActionCreators( {selectView: selectView} , dispatch)
}

//Promote ViewList from a component to a container. 
//It needs to know about this new dispatch methid, selectBook. Make it avalaible as a prop
 //name of the r.component u wanna connect
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewList));
