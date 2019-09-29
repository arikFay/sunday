// redux Stuff.
import { combineReducers } from 'redux';

// Different App Reducers.
import login from './login';
import General from './General';
import Dashboards from './Dashboards';
import dataDashboards from './dataDashboards';
import MyDashboards from './MyDashboards';
import Models from './Models';
// import main from './main';

export default combineReducers({
    login,
    Dashboards,
    dataDashboards,
    General,
    MyDashboards,
    Models
    // main
})