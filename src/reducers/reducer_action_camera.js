import {TOOGLE_CAMERA_SCREEN} from '../actions/index'

export default function(state='flex',action){
    switch(action.type){
        case TOOGLE_CAMERA_SCREEN:
        return action.payload // equivaut a : return state.concat([action.payload]);
    }
    return state
}