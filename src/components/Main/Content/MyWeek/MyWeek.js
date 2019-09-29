import React, { Component } from 'react'
import { Calendar, Badge } from 'antd';
import './MyWeek.css';


function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'צריפין' },
        { type: 'success', content: 'תל השומר' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'מצפה' },
        { type: 'success', content: 'דולפין' },
        { type: 'error', content: 'פד"ם' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'מחנה יהודה' },
        { type: 'success', content: 'מחנה עובדה' },
        { type: 'error', content: 'ראש פינה' },
        { type: 'error', content: 'עין עקב' },
        { type: 'error', content: 'צוקי עובדה' },
        { type: 'error', content: 'חלמיש' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}


export default class MyWeek extends Component {
  render() {
    return (
      <div className='CalendarMission'>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />,
      </div>
    )
  }
}
