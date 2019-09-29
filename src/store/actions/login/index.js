// ====== Login Related Actions ===== // 
// Axios 
import axios from 'axios';
// Prefix for api requiests.
import { PREFIX } from '../general';
// sweetalert
import swal from 'sweetalert';
// Constants relared to login
import { LOGIN_INPUT_CHANGE, USER_AUTHENTICATED, USER_DISCONNECT } from './constants';
import { timeout } from 'q';
// import { UPDATE_CATEGORIES } from '../sidenav/constants';

// Input fields change 
export const loginInputChange = (e) => {
    return { type : LOGIN_INPUT_CHANGE, payload : { field : e.target.name, value : e.target.value }}
}




// --- Authenticate user agains DB.
// -- update isLogged to true
// -- updates the userID for future use.
// -- get all categories available for current user.
export const authenticateUser = (username, password, socket) => {
    return dispatch => {
        socket.emit("login",{userLogin: username, userPassword: password})
        socket.on('login',function(res){
            console.log(res);
            if(res.success == true){
                dispatch({ type: USER_AUTHENTICATED, payload : res });
                socket.on('disconnect', function(){
                    dispatch({ type: USER_DISCONNECT });
                    });
            }else {             
            swal({
                title: "שגיאה בהתחברות",
                text: "שם משתמש או סיסמא שגויים",
                icon: "error"
              });
            }  
        })

    }
}