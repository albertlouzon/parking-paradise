let initialState=[null]
export default function(state=initialState,action){
    switch(action.type){
        case 'TOGGLE_STATUS':
        return [action.payload];

    }

    return state
}