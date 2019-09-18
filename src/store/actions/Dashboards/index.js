
// Constants relared to dash
import { CHANGE_HANDLER_SIDE_MENU } from './constants';



// change visible
export const changeHandlerSideMenu = (flag) => {
    return { type : CHANGE_HANDLER_SIDE_MENU, payload: flag }
}

