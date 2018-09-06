let initialState=['no mission']
export default function(state=initialState,action){
    switch(action.type){
        case 'ROS_MISSION':
        return [action.payload];

    }

    return state
}