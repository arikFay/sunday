// ===== Login Reducer ====== // 
// Relevant Constants
import { CHANGE_HANDLER_SIDE_MENU } from '../../actions/Dashboards/constants';
// Initial State
const initState = {
    // state of Dashboards
    visible: false
}

export default ( state = initState, { type, payload }) => {
    switch(type){
        // --- change visible state.
        case CHANGE_HANDLER_SIDE_MENU:
        console.log("CHANGE_HANDLER_SIDE_MENU");
            return {
                ...state,
                visible : payload
            }
        default:
            return state;
    }
}

console.log(initState);