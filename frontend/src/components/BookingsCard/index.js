import React from "react";
import { useState, useEffect ,useRef} from "react";
import { CheckBookingsThunk } from "../../store/bookings";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBookingThunk } from "../../store/bookings";
import "./index.css"
import Calendar from "react-calendar";
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

  const bookings = useSelector((state) => state.bookings.CurBookings.Bookings);
  console.log("bookings", bookings);

  useEffect(() => {
    dispatch(CheckBookingsThunk(spot.id));
    console.log("checkBookings fired");
  }, [dispatch,spot.id]);

  useEffect(() => {
    const handleWindowClick = (event) => {
        
        console.log(event.target)
        console.log('matches?: ',event.target.matches('react-calendar'))
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
      <div>
      <div>
      <div style={{borderTopLeftRadius:15,borderBottomLeftRadius:15,borderTopRightRadius:15,borderBottomRightRadius:15,height:110}}>
     <div>

      <button className='bookingButton' ref={startButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('start')}}>
            Check-in {startDate === new Date() ? <p>Pick a start date</p> : <p>{startDate.toDateString()}</p>}</button>
            
            
            <button className='bookingButton' ref={endButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('end')}}>
            Checkout {endDate === new Date() ? <p>Pick a end date</p> : <p>{endDate.toDateString()}</p>}</button>
     </div>
            
            <select  style={{display:'block',width:"100%",height:'50%',borderTopLeftRadius:15,borderBottomLeftRadius:15,borderTopRightRadius:15,borderBottomRightRadius:15}}></select>
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
            <input style={{width:"100%",}} type="submit" value={'Reserve'}/>

      </form>
     
      </div>
      </div>
    </>
  );
};


export default BookingsCard;
