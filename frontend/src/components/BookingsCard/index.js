import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect,useRef, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { CheckBookingsThunk, createBookingThunk } from "../../store/bookings";
import "./index.css";
import "../calendar.css";

const BookingsCard = ({ spot }) => {
  console.log("inBookingsCard");
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let [currentBookings, setCurrentBookings] = useState({});
  let [selectDate, setSelectDate] = useState("Start");
  let [showCalendar, setShowCalendar] = useState(false);
  let [buttonClass, setButtonClass] = useState('')
  let [buttonClassTwo, setButtonClassTwo] = useState('')
  const [value, setValue] = useState([startDate,endDate]);
  const startButtonRef = useRef(null);
  const endButtonRef = useRef(null);
  const calendarRef = useRef(null);
  let dispatch = useDispatch();
  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < new Date();
  };

  const bookings = useSelector((state) =>
    Object.values(state.bookings.CurBookings)
  );
  console.log("bookings currently set to ", bookings);

  useEffect(() => {
    dispatch(CheckBookingsThunk(spot.id)).catch((e)=>null);
    console.log("checkBookings fired");
  }, [dispatch, spot.id]);

  useEffect(() => {
    const handleWindowClick = (event) => {
      // console.log(event.target)
      // console.log('matches?: ',event.target.matches('react-calendar'))
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
    console.log("checking availability");
    console.log("bookings bookings bookings ", bookings);
    let unavailable = [];
    bookings.forEach((booking) => {
      let start = new Date(booking.startDate);
      let end = new Date(booking.endDate);
      while (start <= end) {
        unavailable.push(start.toDateString());
        start.setDate(start.getDate()+1);
      }
    });
    const startDateMatch = unavailable.find(
      (date) => date === startDate.toDateString()
    );
    const endDateMatch = unavailable.find(
      (date) => date === endDate.toDateString()
    );
    if (startDateMatch || endDateMatch) {
      alert("unavailable");
      return;
    }
    if(endDate<startDate){
      alert("invalid Date range")
      return
    }
    alert("creating reservation")
    dispatch(
      createBookingThunk({
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        spotId: spot.id,
      })
    ).catch((e) => e);

    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <div className="containerBookingCard">
      <div className="Card">
        <div className="topBit">
          <div className="TopFirst">

            <span className="pricing">{spot.price}</span>
            <span>night</span>
          </div>
          <div className="TopSecond"><p>{`${spot.numReviews} Reviews`}</p></div>
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
          {spot.price}$ X {Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))} 
          </p> <p>${spot.price*Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))}</p></span>
          <span className='fees'><p>cleaning fee</p> <p>$ {`${Math.floor(spot.price/35)}`}</p></span>
          <span className='fees'><p>service fee</p>  <p>$ {`${Math.floor(spot.price/60)}`}</p></span>
          </div>
          <span className='fees'><p>Total</p><p>$ {spot.price*Math.ceil((endDate.getTime() - startDate.getTime())/(1000*3600*24))+Math.floor(spot.price/35)+Math.floor(spot.price/60)}</p></span>
        </div>
      <div className={ `calendarContainer ${divClass1}`} ref={calendarRef}>

      <Calendar
      activeStartDate={new Date()}
      inputRef={calendarRef}
      tileDisabled={tileDisabled}
            // selectRange={true}
            showDoubleView={true}
            onChange={(e) => {
              
              // console.log("calendar Changing","e is currently",e)
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
