import React, { Component } from 'react';
import Clock from 'react-live-clock';

import './Dashboards.css';
import BTN from './BTN/BTN';
import {  Link } from "react-router-dom";

import { connect } from 'react-redux';
import { changeHandlerSideMenu } from '../../../store/actions/Dashboards';
import { ToogleInfoModel } from '../../../store/actions/Models/';
let time = new Date().toLocaleString();


class Dashboards extends Component  {
  constructor(props){
    super(props);
    this.state = {
      socket: this.props.login.socket,
      onlineUsers: null,
      onlineName: {}
    }
  }


  componentDidMount(){
    this.state.socket.on("onlineusers",data =>{
      this.setState({
        onlineUsers: data.online,
        onlineName: data.usernames
      })
      console.log('online', this.state.onlineUsers, this.state.onlineName  )
    })
    
  }

render(){
  const userLogin = this.props.login;
  const fuck = this.state.onlineName;
  // const users = fuck.map((user) =>
  //   <li >{user}</li>

  // );
  console.log(fuck);



    return (
      <div>
        {this.props.sidenav.visible ?  
          <div className='Dashboards'>
          
            <div className="modal-form">
              <span className="close-btn" onClick={() =>  this.props.openSideMenu(false)}></span>
            </div>
            <a onClick={this.props.ToogleInfoModelHandler}><BTN  description='הסבר'/></a>
            <Link to='/main/myDash'><BTN description='המשימות שלי'/></Link>
            <Link to='/main/myWeek'><BTN description='לו"ז משימות'/></Link>
            <Link to='/main'><BTN description='לו"ז משימות משותף'/></Link>
            <div dir="RTL" className="onlineUsers" >
            <h6>משתמשים מחוברים: {this.state.onlineUsers}</h6>
            <ul>
              {this.state.onlineName.map((user) => {
                return <li>{user}</li>
                }
              )
              }
              </ul>
            </div>
            <div className='loginDetail'>
                {/* <h6 className='userLogin'>{userLogin.fullName}</h6>
                <h6 className='userLogin'>{userLogin.madorName}</h6> */}
                {time}
            </div>
          </div> : null}
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
      sidenav : state.Dashboards,
      login : state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      openSideMenu : () => dispatch(changeHandlerSideMenu(false)),
      ToogleInfoModelHandler: () => dispatch(ToogleInfoModel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboards);

