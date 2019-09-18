// --- React & Styling.
import React, { Component } from 'react';
// AntD styles.
import 'antd/dist/antd.css'; 
// App Styling.
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

// Redux & Actions
import { connect } from 'react-redux';

// Components
import Login from './components/Login/Login';
import Main from './components/Main/Main';

import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (

      <BrowserRouter>
      <div className="App">
        {
          this.props.login.isLogged 
            ? <Main />
            : <Login />
        } 
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    login : state.login
  }
}

export default connect(mapStateToProps)(App);
