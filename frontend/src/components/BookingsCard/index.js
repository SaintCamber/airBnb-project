import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect,useRef, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { CheckBookingsThunk, createBookingThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom";
import "./index.css";
import "../cssStuffs/calendar.css";

const BookingsCard = ({ spot,currentUser}) => {
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [currentBookings, setCurrentBookings] = useState({});
  let [selectDate, setSelectDate] = useState("Start");
  let [showCalendar, setShowCalendar] = useState(false);
  let [buttonClass, setButtonClass] = useState('')
  let [buttonClassTwo, setButtonClassTwo] = useState('')
  let history = useHistory()
  const [value, setValue] = useState([startDate,endDate]);
  const startButtonRef = useRef(null);
  const endButtonRef = useRef(null);
  const calendarRef = useRef(null);
  let dispatch = useDispatch();
  
  
  const bookings = useSelector((state) =>
    Object.values(state.bookings.CurBookings)
  );

  
  useEffect(() => {
    dispatch(CheckBookingsThunk(spot.id)).catch((e)=>null);
  }, [dispatch, spot.id]);

  useEffect(() => {
    const handleWindowClick = (event) => {
      // Check if the clicked element is not the calendar or either of the button elements
      if (
        !calendarRef.current.contains(event.target) &&
        !startButtonRef.current.contains(event.target) &&
        !endButtonRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
      if(startButtonRef.current.contains(event.target)){
        setButtonClass("buttonActive")
       }
       if(!startButtonRef.current.contains(event.target)&&!calendarRef.current.contains(event.target)){
        setButtonClass("")
       }
       if(endButtonRef.current.contains(event.target)){
        setButtonClassTwo("buttonActive")
       }
       if(!endButtonRef.current.contains(event.target)&&!calendarRef.current.contains(event.target)){
        setButtonClassTwo("")
       }

    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [showCalendar,buttonClass,buttonClassTwo]);
  let divClass1 = showCalendar ? "show" : "hidden";
  const checkAvailability = (e) => {
    e.preventDefault();
    if (spot.ownerId === currentUser.id) {
      alert("you aren't able to reserve a spot you own");
      return;
    }
    if (endDate - startDate < 1) {
      alert("minimum two days");
      return;
    }
    const unavailable = buildUnavailableArray(bookings, startDate, endDate);
    if (unavailable.includes(startDate.toDateString()) || unavailable.includes(endDate.toDateString())) {
      alert("unavailable");
      return;
    }
    if (endDate < startDate) {
      alert("invalid Date range");
      return;
    }
    alert("creating reservation");
    dispatch(
      createBookingThunk({
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        spotId: spot.id,
      })
    ).catch((e) => e);
  
    setStartDate(new Date());
    setEndDate(new Date());
    history.push("/currentBookings");
  };
  
 const buildUnavailableArray = (bookings, startDate, endDate) => {
    const unavailable = [];
    bookings.forEach((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      while (start <= end) {
        unavailable.push(start.toDateString());
        start.setDate(start.getDate() + 1);
      }
    });
    return unavailable;
  };
  const tileDisabled = ({ activeStartDate, date, view }) => {
    let check = buildUnavailableArray(bookings, startDate, endDate);
    return check.includes(date.toDateString());
  };

  return (
    <div className="containerBookingCard">
      <div className="Card">
        <div className="topBit">
          <div className="TopFirst">

            <span className="pricing">${spot.price}</span>
            <span>night</span>
          </div>
          <div className="TopSecond"><p><FontAwesomeIcon icon={faStar}/>{ spot?.numReviews>0 ? (isNaN(spot.avgStarRating) ? "new":Number(spot?.avgStarRating).toFixed(2)):""}{!spot.numReviews ? "":<span style={{marginLeft:"5px",marginRight:"5px"}}>&#183;</span>}{spot.numReviews > 1 ?`${spot.numReviews} Reviews`:(spot.numReviews>0? `${spot.numReviews} Review`:"new")}</p></div>
        </div> 
        <div className="middleBit">
          <div >
            <div className='Dates'>
              <div className={`bookingButton ${buttonClass}`} ref={startButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('start')}} >{startDate === new Date() ? <p>Pick a start date</p> : <p><span>check-in</span><span>{startDate.toDateString()}</span></p>}</div>
              <div className={`bookingButton ${buttonClassTwo}`} ref={endButtonRef} onClick={() => {setShowCalendar(true); setSelectDate('end')}} >{endDate === new Date() ? <p>Pick an end date</p> : <p><span>check-out</span><span>{endDate.toDateString()}</span></p>}</div>
            </div>
            <div><select>
              <option>1 guests</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4 guests</option>
            </select></div>
            <div className='ReserveButton' onClick={(e)=>checkAvailability(e)}><p>Reserve</p></div>
          </div>
        </div>
        <div className="bottomBit">
          <span className='charge'><p>you won't be charged yet</p></span>
          <div className='chargeTop'>
          <span className='fees'><p>
          {spot.price}$ X {Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))} nights 
          </p> <p>${spot.price*Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))}</p></span>
          <span className='fees'><p>cleaning fee</p> <p>$ {`${Math.floor(spot.price/35)}`}</p></span>
          <span className='fees'><p>service fee</p>  <p>$ {`${Math.floor(spot.price/60)}`}</p></span>
          </div>
          <span className='fees'><p>Total</p><p>$ {spot.price*Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))+Math.floor(spot.price/35)+Math.floor(spot.price/60)}</p></span>
        </div>
      <div className={ `calendarContainer ${divClass1}`} ref={calendarRef}>

      <Calendar
      activeStartDate={startDate}
      tileDisabled={tileDisabled}
            // selectRange={true}
            showDoubleView={true}
            nextLabel={null}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
            onChange={(e) => {
              selectDate==='start' ? setStartDate(new Date(e)):setEndDate(new Date(e));
              
            }}
            value={[startDate,endDate]}>
            </Calendar>
        
      </div>
      </div>
    </div>
  );
};

export default BookingsCard;
