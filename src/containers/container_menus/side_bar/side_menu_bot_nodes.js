import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SystemInfo from './detailed_info'

import { MapsAddLocation, Divider } from 'material-ui';
import { topicSubscribe } from '../../../actions/index'
import BatteryCharging20 from '@material-ui/icons/BatteryCharging20';
import BatteryCharging50 from '@material-ui/icons/BatteryCharging50';
import BatteryCharging60 from '@material-ui/icons/BatteryCharging60';
import BatteryCharging80 from '@material-ui/icons/BatteryCharging80';
import BatteryFull from '@material-ui/icons/BatteryFull';






class BotMenu extends Component {
    constructor(props) {
        super(props);
    }
    state = {
       
      };
    componentWillMount() {
        this.props.topicSubscribe('/indoor/status', 'indoor_msgs/Status');
    }


    renderList() { //batt level < 20 ==>stop current mission and initiate Go base
        return this.props.bot_menu_nodes.map((node, j) => {
            var systemInfo = this.props.upTimeTopic[0]
            //add systeHEalthData for all
            //add upTime for time
            var environment = systemInfo.environment || null
            if(environment=='station'){
                var uptimeS = `${ systemInfo.systemHealthData.Uptime.hours}h: ${systemInfo.systemHealthData.Uptime.minutes}m: 
                ${systemInfo.systemHealthData.Uptime.seconds}sec` || 'no data'

                var temperatureS = Math.round(systemInfo.systemHealthData.temperature) || 'no data'
                var freeRamS =systemInfo.systemHealthData.freeRam || 'no data'
            }
            if(environment=='robot'){
                var uptimeR = `${ systemInfo.systemHealthData.Uptime.hours}h: ${systemInfo.systemHealthData.Uptime.minutes}m: 
                ${systemInfo.systemHealthData.Uptime.seconds}secs` || 'no data'
                var temperatureR = Math.round(systemInfo.systemHealthData.temperature) || 'no data'
                var freeRamR =systemInfo.systemHealthData.freeRam || 'no data'
            }
            var infoContainer = [
                {   
                    uptime:uptimeS,
                    temp : temperatureS,
                    ram : freeRamS
                },
                {
                    uptime:uptimeR,
                    temp : temperatureR,
                    ram : freeRamR
                }
            ]


            var batteryIndicator = undefined
            var batteryNumber = 100
            if (node.name == 'Drone') {
                //here we check the current battery of the drone and, according to its value, we update the batttery icon (from 20 to 100). DEfault val = 100
                 //better if you transform it into a switch statement.
                batteryNumber = this.props.rosTopics[0].batteryLevel || 'disconnected'
                batteryIndicator = batteryNumber + '%'
                if (batteryNumber >= 70 && batteryNumber <= 90) {
                    node.menuIcon = <BatteryCharging80 />
                }
                else if (batteryNumber >= 50 && batteryNumber < 70) {
                    node.menuIcon = <BatteryCharging60 />
                }
                else if (batteryNumber >= 20 && batteryNumber < 50) {
                    node.menuIcon = <BatteryCharging50 style={{ color: 'red' }} />
                } else if (batteryNumber >= 0 && batteryNumber < 20) {
                    node.menuIcon = <BatteryCharging20 style={{ color: 'red' }} />
                } else {
                    node.menuIcon = <BatteryFull style={{ color: 'lightgreen' }} />
                }
            } 
            else {
                batteryIndicator = undefined
            }
            
            return (
                <div>

                    <SystemInfo title={
                        <ListItem button style={{ fontSize: '16px' }} xs={6} md={2} lg={2}
                            key={node.name}
                        >
                            <ListItemIcon>
                                {node.menuIcon}
                            </ListItemIcon>
                            <ListItemText primary={node.name} />
                        </ListItem>
                    } content={
                        <ul>
                            <li><span style={{color:'#D59AFD',}}>Uptime</span>  <span style={{paddingLeft:'1vh'}}>{infoContainer[j].uptime}</span></li>
                            <li><span style={{color:'#D59AFD',}}>Temperature</span>  <span style={{paddingLeft:'1vh'}}>{infoContainer[j].temp}</span> </li>
                            <li><span style={{color:'#D59AFD',}}>Free Ram</span>  <span style={{paddingLeft:'1vh'}}>{infoContainer[j].ram}</span></li>
                        </ul>
                    } />

                </div>


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
    return {
        bot_menu_nodes: state.botMenuNodes,
        rosTopics: state.rosTopics,
        upTimeTopic : state.upTimeTopic
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ topicSubscribe: topicSubscribe }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(BotMenu); //name of the r.component u wanna connect