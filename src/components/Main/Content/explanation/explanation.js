import React, { Component } from 'react';
import './explanation.css';
import { Carousel } from 'antd';


class explanation extends Component {
    render() {
        return (
            <div className='container'>
                <Carousel autoplay className='Carousel'>
                    <div>
                    <h1 className='title'>Sunday</h1>
                    </div>
                    <div>
                    <h3>.המערכת נבנתה על מנת להקל על משתתפי בניין הכוח בהוספת משימות חדשות ובקרה עליהם</h3>
                    </div>
                    <div>
                    <h3>השבוע שלי: מציג את כל המשימות שיש למדור/פלוגה שלך בשבוע הזה</h3>
                    </div>
                    <div>
                    <h3>לו"ז משימות: מציג ומאפשר להוסיף משימות לאותו החודש ולערוך את הסטאטוס שלהם</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default explanation;
