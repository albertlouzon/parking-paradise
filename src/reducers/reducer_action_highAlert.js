export default function high_alert(state = [], action) {
    switch (action.type) {
        case 'HIGH_ALERT':
        return action.payload;
        case 'CLOSE_HIGH_ALERT':
        return action.payload;

        default:
            return state
    }
}