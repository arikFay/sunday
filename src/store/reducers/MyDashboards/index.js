// ===== Login Reducer ====== // 
// Relevant Constants
import { ON_GET_MADORS_HANDLER,  SHOW_MODAL_HANDLER, HANDLE_OK_HANDLER, HANDLE_CANCEL_HANDLER, HANDLE_CHANGE_HANDLER, ON_CHANGE_HANDLER, HANDLE_NEXT_HANDLER, ON_UPDATE_HANDLER, UPDATE_MISSION_DATA_HANDLER, UPDATE_MISSION_DATE_HANDLER, ON_SUBMIT_HANDLER, GET_DATA_HANDLER } from '../../actions/MyDashboards/constants';
import { node } from 'prop-types';


// Initial State
const initState = {
    madors: [],
    visible: false,
    madorselected: [],
    flagLoop: null,
    missionData: { 
        teams: {},
         description: null,
         stand: null,
         date: null,
         budgetsum: null,
         creator: null,
         network: null,
         sitenumber: null,
         sitename: null,
         note: null
    },
    FullData:{}
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
            console.log("payload",payload)
                return {

                    ...state,
                    madors: [...state.madors, {value : payload.teams._id, label: payload.teams.name}],
                    flagLoop: 1,
                    
                    missionData:{
                        ...state.missionData,
                        creator: payload.user
                    }

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
                };
            case HANDLE_CANCEL_HANDLER:
                return{
                    ...state,
                    visible: false,
                    missionData: {
                        teams: {},
                         description: null,
                         stand: null,
                         date: null,
                         budgetsum: null,
                         creator: null,
                         network: null,
                         sitenumber: null,
                         sitename: null,
                         note: null
                    },
                    madorselected: [],
                };
            case ON_CHANGE_HANDLER:
                var fff = {};

                if(payload.checked){
                    fff =  [...state.madorselected, {value: payload.value, label: payload.label}]

                } else{

                    fff =  [...state.madorselected.filter(item => item.value != payload.value)] 
                }

                return{
                    ...state,
                    madorselected: fff,          
                    missionData: {
                        ...state.missionData,
                        teams:{
                            ...state.missionData.teams,
                            [payload.value]:{
                                notes: null,
                                budget: null
                            }
                        }
                    }
                    // madorselected: [...state.madorselected, payload],
                };

            case HANDLE_NEXT_HANDLER:
                return{
                    ...state,
                    panelState: ![...state.panelState]
                }
            case ON_UPDATE_HANDLER:
                return{
                    ...state,
                    missionData: {
                        ...state.missionData, 
                        teams: {
                            ...state.missionData.teams,
                            [payload.id]:{
                                ...state.missionData.teams[payload.id],
                                [payload.field]: payload.value
                                }
                            }
                        }
                    }
                    
                
            case UPDATE_MISSION_DATA_HANDLER:
                return {
                    ...state,
                    missionData: Object.assign({}, {
                        ...state.missionData,
                        [payload.field] : payload.value
                    })
                }
            case UPDATE_MISSION_DATE_HANDLER:
                return{
                    ...state,
                    missionData: {
                        ...state.missionData, 
                        date: payload
                    }
                }
            case ON_SUBMIT_HANDLER:
            console.log(state)
                return{
                    ...state,
                    missionData: {
                        teams: {},
                         description: null,
                         stand: null,
                         date: null,
                         budgetsum: null,
                         creator: null,
                         network: null,
                         sitenumber: null,
                         sitename: null,
                         note: null
                    },
                    madorselected: [],
                    visible: false
                }
            case GET_DATA_HANDLER:
                return{
                    ...state,
                    FullData: payload
                }
        

            
            default:
            return state;
    }
}






