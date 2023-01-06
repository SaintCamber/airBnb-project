import React from "react";
import { useState, useEffect ,useRef} from "react";
import { CheckBookingsThunk } from "../../store/bookings";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBookingThunk } from "../../store/bookings";
import "./index.css"
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-regular-svg-icons"
const BookingsCard = ({ spot }) => {
  console.log("inBookingsCard");
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [currentBookings, setCurrentBookings] = useState({});
    let [selectDate,setSelectDate] =useState("Start")
    let [showCalendar,setShowCalendar]=useState(false)
    const startButtonRef = useRef(null);
  const endButtonRef = useRef(null);
  const calendarRef = useRef(null)
  let dispatch = useDispatch();

  const bookings = useSelector((state) => Object.values(state.bookings.CurBookings));
  console.log("bookings currently set to ", bookings);

  useEffect(() => {
    dispatch(CheckBookingsThunk(spot.id));
    console.log("checkBookings fired");
  }, [dispatch,spot.id]);

  useEffect(() => {
    const handleWindowClick = (event) => {
        
        // console.log(event.target)
        // console.log('matches?: ',event.target.matches('react-calendar'))
      // Check if the clicked element is not the calendar or either of the button elements
      if (!calendarRef.current.contains(event.target) && !startButtonRef.current.contains(event.target) && !endButtonRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [showCalendar]);
let divClass1 = showCalendar ? 'show':'hidden'

const checkAvailability = (e)=>{

    e.preventDefault()
    console.log("checking availability")
    console.log('bookings bookings bookings ',bookings)
    let unavailable = []
    bookings.forEach(booking=>{
        let start = new Date(booking.startDate)
        let end = new Date(booking.endDate)
        while(start<=end){
            unavailable.push(start.toDateString())
            start.setDate(start.getDate()+1)

        }})
        const startDateMatch = unavailable.find((date) => date === startDate.toDateString());
  const endDateMatch = unavailable.find((date) => date === endDate.toDateString());
  if(startDateMatch||endDateMatch){
    alert('unavailable')
    return 
  }
            dispatch( createBookingThunk({startDate : startDate.toDateString(),endDate:endDate.toDateString(),spotId:spot.id}))
            
            
            
            setStartDate(new Date())
            setEndDate(new Date())
            console.log('fired create booking think')
            alert("reservation successful")
            
        }
        
        return (
         
            <>
      <div style={{display:"flex", alignContent:"center",justifyItems:'center',flexDirection:"column",border:"2px solid black",height:"250px",padding:10,width:"250px",float:"right",position:'sticky',top:100,bottom:250,boxShadow:"-5px 10px 10px lightgrey",borderRadius:"30px"}}>
      <div style={{width:250,display:'flex',flexDirection:"row",height:'30px'}}>
        <span style={{marginRight:15}}>{spot.price}$ per night</span>    <span style={{marginLeft:"10px"}}>{spot.avgStarRating}<FontAwesomeIcon icon={faStar}/></span> <span style={{marginLeft:"10px"}}>. {spot.numReviews} Reviews</span> 
      </div>
      <div>
      <div style={{marginTop:15,borderTopLeftRadius:15,borderBottomLeftRadius:15,borderTopRightRadius:15,borderBottomRightRadius:15,height:110}}>
     <div style={{display:'flex',justifyContent:"flex-end",width:250}}>

      <button className='bookingButton' ref={startButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('start')}} style={{width:125,height:50}}>
            Check-in {startDate === new Date() ? <p>Pick a start date</p> : <p style={{marginTop:1}}>{startDate.toDateString()}</p>}</button>
            
            
            <button className='bookingButton' ref={endButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('end')}} style={{width:125,height:50}} >
            Checkout {endDate === new Date() ? <p>Pick a end date</p> : <p style={{marginTop:1}}>{endDate.toDateString()}</p>}</button>
            
     </div>
     <div>
            <select style={{display:'block',width:250,height:50,borderTopLeftRadius:15,borderBottomLeftRadius:15,borderTopRightRadius:15,borderBottomRightRadius:15}} name='guests'>
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
            </select>
     </div>
      </div>
      <form onSubmit={(e)=>checkAvailability(e)}>
      <div className={divClass1} ref={calendarRef}>
      <Calendar
            
            onChange={(e) => {
                calendarRef.contains = e.target
              selectDate==='start' ? setStartDate(e):setEndDate(e);
            }}
            value={selectDate === 'start' ? startDate : endDate}>
            </Calendar>
      </div>
            <input style={{width:"100%", marginTop:20}} type="submit" value={'Reserve'}/>

      </form>
     <div>
            {spot.price}$ X {Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))} Nights = {spot.price*Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))}$
     </div>
      </div>
      </div>
    </>
  );
};


export default BookingsCard;
