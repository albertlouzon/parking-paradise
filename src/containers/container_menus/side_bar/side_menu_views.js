import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {selectView} from '../../../actions/index'
import {bindActionCreators} from 'redux'



import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class MailFolderListItems extends Component {
    constructor(props) {
        super(props);
    }
    renderList(){
        return this.props.view.map((view)=>{
            return(
                    <ListItem button style={{fontSize:'16px'}} xs={6} md={2} lg={2} 
                        onClick={() => this.props.selectView(view)} key={view.name}>
                                  <ListItemIcon>
                                        {view.menuIcon}
                                  </ListItemIcon>
                                  <ListItemText primary={view.name} />
                    </ListItem>
               )
        })
    }

    render() { 
        return (
            <div >
                    {this.renderList()}
            </div>
            
          );
    }
}




function mapStateToProps(state) {
    return {view : state.views    } 
}

function  mapDispatchToProps (dispatch){
    return bindActionCreators( {selectView: selectView} , dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MailFolderListItems); //name of the r.component u wanna connect