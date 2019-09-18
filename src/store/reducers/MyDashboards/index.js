// ===== Login Reducer ====== // 
// Relevant Constants
import { ON_GET_MADORS_HANDLER, ON_DELETE_MADORS_HANDLER , SHOW_MODAL_HANDLER, HANDLE_OK_HANDLER, HANDLE_CANCEL_HANDLER, HANDLE_CHANGE_HANDLER, ON_CHANGE_HANDLER } from '../../actions/MyDashboards/constants';


// Initial State
const initState = {
    madors: [],
    visible: false,
    madorselected: [],
    flagLoop: null
}

export default ( state = initState, { type, payload }) => {
    switch(type){

        // // --- User successfully Authenticated.
        // case ON_DELETE_MADORS_HANDLER:
        // {console.log("delete", ...state.madors, state.flag)}
        //     return {
        //         ...state,
        //         madors: [], 
        //     };
        //     // {
        case ON_GET_MADORS_HANDLER:
            return {
                
                ...state,
                madors: [...state.madors, {value : payload._id, label: payload.name}],
                flagLoop: 1 
            };
        case SHOW_MODAL_HANDLER:
            return {
                ...state,
                visible: true
            };
        case HANDLE_OK_HANDLER:
            return {
                ...state,
                visible: false,

            };
        case HANDLE_CHANGE_HANDLER:
            return {
                ...state,
                madorselected: payload
            }
        case HANDLE_CANCEL_HANDLER:
            return{
                ...state,
                visible: false,
            }
        case ON_CHANGE_HANDLER:
            var fff = {};
            if(payload.checked){
                fff =  [...state.madorselected, {value: payload.value, label: payload.label}]
            } else{
                fff =  [...state.madorselected.filter(item => item.value != payload.value)] 
            } 

            return{
                ...state,
                madorselected: fff           
                // madorselected: [...state.madorselected, payload],
            }

            
            default:
            return state;
    }
}






