import { combineReducers } from 'redux';
import ViewsReducer from './reducer_views'
import ActiveView from './reducer_active_view'
import CameraScreen from './reducer_camera_screen'
import Missions from './reducer_missions'
import ActionCamera from './reducer_action_camera'
import ActionMissions from './reducer_action_missions'
import BotMenuNodes from './reducer_bot_menu'
import RosTopics from './reducer_action_rostopic'
import LowAlert from './reducer_action_lowAlert'
import HighAlert from './reducer_action_highAlert'
import RasberryPi from './reducer_action_rasberryPi'
import WaypointTopic from './reducer_action_waypoint'
import UpTimeTopic from './reducer_action_uptime'
import RosAnomalies from './reducer_action_anomaly'
import ControlItems from './reducer_controls'
import Modal from './reducer_action_modals'
import Statuses from './reducer_action_status'
import Mission_mutation from './reducer_mutations'


//refers to the objects written inside the reducer folder.
const rootReducer = combineReducers({
    views : ViewsReducer, 
    activeView : ActiveView,
    cameraView : CameraScreen,
    missions : Missions,
    actionCamera: ActionCamera,
    actionMissions: ActionMissions,
    botMenuNodes : BotMenuNodes,
    rosTopics : RosTopics,
    controlItems:ControlItems,
    modal : Modal,
    statuses : Statuses,
    rosAnomalies:RosAnomalies,
    rasberryPi:RasberryPi,
    waypointTopic : WaypointTopic,
    upTimeTopic:UpTimeTopic,
    mission_mutation: Mission_mutation,
    lowAlertProps:LowAlert,
    hightAlertProps : HighAlert

});

export default rootReducer;
