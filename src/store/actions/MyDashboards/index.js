
// Constants relared to dash
import { ON_GET_MADORS_HANDLER, ON_DELETE_MADORS_HANDLER , SHOW_MODAL_HANDLER, HANDLE_OK_HANDLER, HANDLE_CANCEL_HANDLER, HANDLE_CHANGE_HANDLER, ON_CHANGE_HANDLER, HANDLE_NEXT_HANDLER, ON_UPDATE_HANDLER, UPDATE_MISSION_DATA_HANDLER, UPDATE_MISSION_DATE_HANDLER, ON_SUBMIT_HANDLER, GET_DATA_HANDLER } from './constants';



export const GetMadorsHandler = ( socket, user ) => {
    return dispatch => {
        socket.emit("teams")
        socket.on("teamsout",data => {
            data.forEach((teams) => {
                // console.log(teams);
                dispatch({ type: ON_GET_MADORS_HANDLER, payload : {teams:teams , user:user }}) 
            })
                })
    }
}
export const DeleteMadorsHandler = () => {
    return dispatch => {
            dispatch({type: ON_DELETE_MADORS_HANDLER}) 
    }
}

export const ShowModalHandler = () => {
    return dispatch => {
            dispatch({type: SHOW_MODAL_HANDLER})
    }
}

export const HandleOKHandler = () => {
    return dispatch => {
        dispatch({type: HANDLE_OK_HANDLER})
    }
}

export const HandleChangeHandler = (datachange) => {
    return dispatch => {
        dispatch({ type: HANDLE_CHANGE_HANDLER, payload: datachange })
    }
} 

export const HandleCancelHandler = (Modal) => {
    Modal.destroyAll()
    return dispatch => {
        dispatch({ type: HANDLE_CANCEL_HANDLER })
    }
}

export const onChangeHandler = (e) => {
    return dispatch => {
        dispatch({ type: ON_CHANGE_HANDLER, payload: {value: e.target.value, label: e.target.label ,checked: e.target.checked }})
    }
}

export const onSubmitHandler = (socket,mission) => {
    return dispatch => {
        socket.emit("createMission",mission)
        dispatch({ type: ON_SUBMIT_HANDLER })
    }
}

export const OnUpdateHandler = (e, id) => {
    return dispatch => {
        dispatch({ type: ON_UPDATE_HANDLER , payload : { id: id ,field : e.target.name, value : e.target.value }})
    }
}

// Input fields change 
export const UpdateMissionDataHandler = (e) => {
    return { type : UPDATE_MISSION_DATA_HANDLER, payload : { field : e.target.name, value : e.target.value }}
}

export const UpdateMissionDateHandler = (date) => {
    return { type : UPDATE_MISSION_DATE_HANDLER, payload : date }
}

export const GetDataHandler = ( socket, user ) => {

return dispatch => {
    socket.emit("getData")
    socket.on("getData",data => {
            console.log(data);
            dispatch({ type: GET_DATA_HANDLER, payload : data}) 
            })
    }
}