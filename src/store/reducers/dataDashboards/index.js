// ===== Login Reducer ====== // 
// Relevant Constants
import { OPEN_SESSION_HANDLER, OPEN_MODEL_HANDLER, CLOSE_MODEL_HANDLER, ON_ROW_SELECTED_HANDLER , ON_DELETE_ROW_HANDLER, ON_SELECT_MADOR_HANDLER, ON_DELETE_MADOR_HANDLER } from '../../actions/dataDashboards/constants';
import { object } from 'prop-types';

// Initial State
const initState = {
    data: [],
    visible: false,
    id: null,
    selected: [],
    currPage: 1,
    madors: []
}

export default ( state = initState, { type, payload }) => {
    switch(type){

        // --- User successfully Authenticated.
        case OPEN_SESSION_HANDLER:
            return {
                ...state,
                data : payload
            };
        case OPEN_MODEL_HANDLER:
            return {
                ...state,
                visible: payload.visible,
                id: payload.id  
            };
        case CLOSE_MODEL_HANDLER:
        return {
            ...state,
            visible: payload.visible,
            id: payload.id  
        };
        case ON_ROW_SELECTED_HANDLER:
            return{
                ...state,
                selected: payload.selected,
                currPage: payload.currPage
            }
        case ON_DELETE_ROW_HANDLER:
            return{
                ...state,
                selected: []
            }
        case ON_SELECT_MADOR_HANDLER:
        // {console.log("Payload",payload[0].id)}
        // console.log(state.madors)
        // {console.log("madors",madors)}
        return{
            ...state,
            madors: [...state.madors, {value : payload[0].id, label: payload[0].name, color: "#ff0000"}], 
            }
        case ON_DELETE_MADOR_HANDLER:
        // {console.log("Payload",payload[0].id)}
        // console.log(state.madors)
        // {console.log("madors",madors)}
        return{
            ...state,
            madors: [], 
            }

        default:
            return state;
    }
}






