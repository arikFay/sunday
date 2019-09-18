
// Constants relared to dash
import { ONLINE_USERS_HANDLER } from './constants';


export const onlineusersHandler = ( socket ) => {
    return dispatch => {
        socket.on("onlineusers",data => 
        dispatch({ type: ONLINE_USERS_HANDLER , payload: { onlineUsers: data.online , onlineName: data.usernames } }))
    }
}

