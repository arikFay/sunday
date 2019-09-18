
// Constants relared to dash
import { OPEN_SESSION_HANDLER,ON_DELETE_MADOR_HANDLER, OPEN_MODEL_HANDLER , CLOSE_MODEL_HANDLER ,  ON_DELETE_ROW_HANDLER, ON_ROW_SELECTED_HANDLER , ON_SELECT_MADOR_HANDLER } from './constants';


export const openSessionHandler = ( socket ) => {
    return dispatch => {
        socket.emit("rec")
        socket.on("recoutput",data => dispatch({ type: OPEN_SESSION_HANDLER, payload : data }) )
    }
}

export const SelectMador = (data) => {

    return { type: ON_SELECT_MADOR_HANDLER, payload : data }
    
}
export const onDeleteMadorHandler = () => {
        
    return dispatch => {
        dispatch({type: ON_DELETE_MADOR_HANDLER});
        // socket.emit("delete", id);
}
}

export const onDeleteRowHandler = ( socket, id ) => {
        
        return dispatch => {
            dispatch({type: ON_DELETE_ROW_HANDLER});
            socket.emit("delete", id);
}
}




export const  ifselecthandler = (msd,currPage) => {
        return dispatch => {
            dispatch({type: ON_ROW_SELECTED_HANDLER, payload : { selected: msd , currPage:currPage }});
        }
    } 
    
    export const  ifnoselecthandler = (msd,currPage,selected) => {
        return dispatch => {
            dispatch({type: ON_ROW_SELECTED_HANDLER, payload : { selected: selected.filter(it => it !== msd) , currPage:currPage }});
        }
    }
    


  export const openModalHandler = ( id ) => {
        return({ type: OPEN_MODEL_HANDLER, payload : {visible:true , id : id} }) 
    }

export const closeModalHandler = (id) => {
    return({ type: CLOSE_MODEL_HANDLER, payload : {visible:false , id : id} }) 
}
