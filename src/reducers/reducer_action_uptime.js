//if this action doesnt work, it is because of the SetInterval that is likely to destroy the redux structure.
//Erase it and just return action.payload instead, and it will work fine

let initialState=['no upTime']
export default function(state=initialState,action){
    switch(action.type){
        case 'ROS_UPTIME':
        setInterval(()=>{
            return [action.payload]
        }, 1000);
    }
    return state
}