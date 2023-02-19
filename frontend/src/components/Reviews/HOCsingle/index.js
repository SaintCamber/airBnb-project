import React ,{useEffect}from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckBookingsThunk } from "../../../store/bookings";
import { getSpotReviews} from "../../../store/Reviews";
import SingleSpot from "../../SingleSpot";
const HOCsingle = ({ Spots }) => {
  let { spotId } = useParams();
  let [state, setState] = useState({});
  let dispatch = useDispatch();
  const spotBookings = useSelector((state) => state.bookings.spotBookings);
  const spotReviews = useSelector((state) => state.reviews.spotReviews);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(CheckBookingsThunk(spotId))
    dispatch(getSpotReviews(spotId));
  }, [spotId, state, dispatch]);

  return (
    <div>
      <SingleSpot
        Spot={Spots[spotId]}
        bookings={spotBookings}
        reviews={spotReviews}
        user={currentUser}
        state={setState}
      />
    </div>
  );
};

export default HOCsingle;
