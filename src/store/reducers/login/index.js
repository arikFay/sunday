// ===== Login Reducer ====== // 
// Relevant Constants
import { LOGIN_INPUT_CHANGE, USER_AUTHENTICATED, USER_DISCONNECT } from '../../actions/login/constants';
import io from 'socket.io-client';
// Initial State
const initState = {
    // user form input fields.
    loginForm : {
        username : '',
        password : ''
    },
    // is the user currently logged.
    isLogged : false,
    // after user logged in, use its id to perform actions.
    userID: null,
    madorName: null,
    fullName: null,
    role: null,
    socket: io("http://10.0.0.102:4000")
}

export default ( state = initState, { type, payload }) => {
    switch(type){

        // ---  Login input value change
        case LOGIN_INPUT_CHANGE:
            return {
                ...state,
                loginForm: Object.assign({}, {
                    ...state.loginForm,
                    [payload.field] : payload.value
                })
            }
            
        // --- User successfully Authenticated.
        case USER_AUTHENTICATED:
        {console.log(payload)}
            return {
                ...state,
                isLogged : true,
                userID : payload.userID,
                madorName : payload.teamname,
                fullName : payload.userfullname,
                role: payload.role,
                loginForm: Object.assign({}, {
                    username : '',
                    password : ''
                })
            }
        case USER_DISCONNECT:
            return{
                ...state,
                isLogged : false,
                userID : '',
                madorName : '',
                fullName : '',
                role: '',
                loginForm: Object.assign({}, {
                    username : '',
                    password : ''
                })
            }
        default:
            return state;
    }
}