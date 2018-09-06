let initialState=['no waypoint']
export default function(state=initialState,action){
    switch(action.type){
        case 'ROS_WAYPOINT':
        return [action.payload];

    }


    return state
}