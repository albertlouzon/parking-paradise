//sta
let initialState=['nothing']
export default function(state=initialState,action){
    switch(action.type){
        case 'CAMERA_SOURCE':
        return [action.payload];
    }


    return state
}