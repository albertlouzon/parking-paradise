//sta
export default function(state=null,action){
    switch(action.type){
        case 'VIEW_SELECTED':
        return action.payload;

    }

    return state
}