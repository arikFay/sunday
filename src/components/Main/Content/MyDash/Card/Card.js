import React from 'react'
import './Card.css';

export default function Card(props) {
  return (
    <div className='Card'>
      <h3 className='ContentCard'>name: {props.name}</h3>
      <h3 className='ContentCard'>name: {props.mission}</h3>
    </div>
  )
}
