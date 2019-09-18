
import './Content.css';
import React from 'react';
import { Route, Switch  } from "react-router-dom";
import './Content.css';
import { Icon } from 'antd';


import MyDash from './MyDash/MyDash';
import SharedDash from './SharedDasd/SharedDasd';
import explanation from './explanation/explanation';
import MyWeek from './MyWeek/MyWeek';


import { connect } from 'react-redux';
import { changeHandlerSideMenu } from '../../../store/actions/Dashboards';


const Content = (props) => {
    // const { visible } = props.sidenav.visible;
    const login = props.login;
        return (
        <div className={props.sidenav.visible ? 'Content' : 'ContentFull'}>
        <nav className="navbar">
        {props.sidenav.visible ? null :
        <div>
        <Icon type="menu" className="open" onClick={() =>  props.openSideMenu(true)} />
         {/* <h1  className='wellcome'>{login.madorName} ממדור {login.fullName} ברוך הבא </h1> */}
         <h1 className='wellcome'> ברוך הבא {login.fullName} ממדור {login.madorName}</h1>
         </div>}
        </nav>

            <Switch>
                <Route  exact path='/main' component={SharedDash}/>
                <Route  path='/main/MyDash' component={MyDash}/>
                <Route  path='/main/MyWeek' component={MyWeek}/>
                <Route  path='/main/explanation' component={explanation}/>
            </Switch>
        </div>
        );
    }





const mapStateToProps = state => {
  return {
      sidenav : state.Dashboards,
      login : state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      openSideMenu : () => dispatch(changeHandlerSideMenu(true)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);

