// React & Styling
import React from 'react';
import './Login.css';
import logo from '../../img/icon.png';

// Redux & Actions
import { connect } from 'react-redux';
import { authenticateUser, loginInputChange } from '../../store/actions/login';

//---antd---//
import { Input, Tooltip, Icon, Button  } from 'antd';









const Login = (props) => {
  const { username, password } = props.login.loginForm;
  const { socket } = props.login;
  console.log(socket);
        return (
          
            <div className='Login'>
                <div className='LoginPanel'>
                <img src={logo} alt="Logo" />
                <Input 
                  className='input' 
                  value={username}
                  onChange={(e) => props.loginInputChangeHandler(e)}
                  name='username' 
                  placeholder="הכנס שם משתמש"
                  prefix={<Icon  className='icon' type="user" 
                  style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Extra information">
                    <Icon className='icon' type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    }
                />
                <Input.Password 
                  className='input' 
                  value={password}
                  onChange={(e) => props.loginInputChangeHandler(e)}
                  type= 'password'
                  name='password'
                  placeholder="הכנס סיסמא" 
                 />

                <Button 
                  onClick = {() => props.authenticateUserHandler(username, password, socket)} 
                  type="primary">
                  <span className='submit'>התחבר</span>
                </Button> 
                

  
                    
                </div>
                <p className='copyright'>AppTeam פותח ע"י צוות &#169;</p>

            </div>
            
  );
}




const mapStateToProps = state => {
  return {
      login : state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      authenticateUserHandler : (username, password, socket) => dispatch(authenticateUser(username, password, socket)),
      loginInputChangeHandler : (e) => dispatch(loginInputChange(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
