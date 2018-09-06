
export default function low_alert(state = [], action) {
    switch (action.type) {
        case 'LOW_ALERT':
        return action.payload;
        case 'CLOSE_LOW_ALERT':
        return action.payload;

        default:
            return state
    }
}