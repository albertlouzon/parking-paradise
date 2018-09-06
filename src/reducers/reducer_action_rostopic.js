//sta
let initialState=['nothing']
export default function(state=initialState,action){
    switch(action.type){
        case 'ROS_STATUS':
        return [action.payload];

    }


    return state
}