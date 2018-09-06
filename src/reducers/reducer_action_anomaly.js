let initialState=[]
export default function(state=initialState,action){
    switch(action.type){
        case 'ROS_TOPICANOMALY':
        return [action.payload];
    }
    return state
}