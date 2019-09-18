
// Constants relared to dash
import { ON_GET_MADORS_HANDLER, ON_DELETE_MADORS_HANDLER , SHOW_MODAL_HANDLER, HANDLE_OK_HANDLER, HANDLE_CANCEL_HANDLER, HANDLE_CHANGE_HANDLER, ON_CHANGE_HANDLER } from './constants';



export const GetMadorsHandler = ( socket ) => {
    return dispatch => {
        socket.emit("teams")
        socket.on("teamsout",data => {
            data.forEach((teams) => {
                // console.log(teams);
                dispatch({ type: ON_GET_MADORS_HANDLER, payload : teams }) 
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

export const HandleCancelHandler = () => {
    return dispatch => {
        dispatch({ type: HANDLE_CANCEL_HANDLER })
    }
}

export const onChangeHandler = (e) => {
    return dispatch => {
        dispatch({ type: ON_CHANGE_HANDLER, payload: {value: e.target.value, label: e.target.label ,checked: e.target.checked }})
    }
}
