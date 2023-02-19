import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CheckBookingsThunk } from '../../../store/bookings';
import { getSpotReviewsThunk } from '../../../store/reviews';
import SingleSpot from '../../SingleSpot';
const HOCsingle = ({Spots}) => {
    let {spotId} = useParams()
    let [state,setState]  = useState({})
    let dispatch = useDispatch();
    const spotBookings = useSelector((state) => state.bookings.spotBookings);
    const spotReviews = useSelector((state) => state.reviews.spotReviews);
    const currentUser = useSelector((state) => state.session.user);
useEffect(() => {
    dispatch(CheckBookingsThunk(spotId))}, [spotId,state, dispatch]);
    dispatch(getSpotReviewsThunk(spotId));
    }


    return (
        <div className={style}>
            <SingleSpot Spot={Spots[spotId]} bookings={spotBookings} reviews={spotReviews} user={currentUser} state={setState} />
        </div>
    );
};



export default HOCsingle;
