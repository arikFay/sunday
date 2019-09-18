import React, { Component } from 'react';
import './BTN.css'

class BTN extends Component {
    render() {

        return (
            <div>
                <div className='myWeek btn-menu'>
                    <span className='span'>{this.props.description}</span>   
                </div>

            </div>
        );
    }
}

export default BTN;