import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MissionList from '../containers/container_missions/mission_list'
import TabBoard from '../containers/container_board/tab_board'

class MissionView extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <MissionList/>
            </div>

         );
    }
}
 
export default MissionView;