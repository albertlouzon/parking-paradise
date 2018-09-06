
export default function missionManager(state = 'no mission', action) {
    switch (action.type) {
        case 'CLICK_MISSION':
        let i = action.index
        var name = action.payload[i].name || 'no mission'
        return action.payload[i].name;
        
        case 'CANCEL_MISSION':

        return 'no mission'


        default:
            return state
    }
}