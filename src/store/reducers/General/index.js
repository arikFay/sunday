// ===== Login Reducer ====== // 
// Relevant Constants
import { ONLINE_USERS_HANDLER } from '../../actions/General/constants';

// Initial State
const initState = {
    onlineUsers: null,
    onlineName: {}
   
}

export default ( state = initState, { type, payload }) => {
    switch(type){

        // --- Users online.
        case ONLINE_USERS_HANDLER:
        {console.log(payload)}
            return {
                ...state,
                onlineUsers : payload.onlineUsers,
                onlineName : payload.onlineName
            };

        default:
            return state;
    }
}





