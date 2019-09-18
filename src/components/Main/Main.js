import React, { Component } from 'react';
import './Main.css';
import Content from './Content/Content';
import NavBar from './NavBar/NavBar'
import Dashboards from './Dashboards/Dashboards';

export default class Main extends Component {
  render() {
    return (
    <div className='Main'>
        <NavBar className='NB'/>
        <Dashboards className='DB' /> 
        <Content className='CT' />
        <p className='copyright'>AppTeam פותח ע"י צוות &#169;</p>
    </div>
    )
  }
}
