import React from 'react'
import { useState } from 'react';
import './dateSelector.css'
import Calendar from 'react-calendar'
import { useRef } from 'react';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton'


export default function DateSelector() {


    return (

    <div>
        <button className='dateButton' onClick={()=>alert('not implemented yet please try again later')}>anywhere</button>
        <button className='dateButton' onClick={()=>alert('not implemented yet')}>Start Date</button>        
        <button className='dateButton' onClick={()=>alert('not implemented yet')}>End Date</button>
    </div>

    
          
    
    );
  }