// ===== Login Reducer ====== // 
// Relevant Constants
import { TOOGLE_INFO_MODEL } from '../../actions/Models/constants';

const initState = {
    info: false
}

export default ( state = initState, { type, payload }) => {
    switch(type){
        case TOOGLE_INFO_MODEL:
            return {
                ...state,
                info : !state.info,
            }
        default:
            return state;
    }
}