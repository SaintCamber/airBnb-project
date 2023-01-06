import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from "../../store/Spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import BookingsCard from "../BookingsCard";
import "./SingleSpot.css";
export default function SingleSpot() {
  console.log("inside single spot");
  let params = useParams();
  let spotId = Number(params.spotId);
  let Spot = useSelector((state) => state.spots.SingleSpot);
  let SpotList = useSelector((state) => state.spots.AllSpots);
  console.log("spotId", spotId);
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("inside useEffect single Spot");
    const GetSpot = async () => {
      dispatch(thunkOneSpot(spotId));
    };
    GetSpot();
  }, [dispatch, spotId]);
  console.log("Spot", Spot);
  console.log("testImages", Spot.SpotImages);
  const images = Spot?.SpotImages?.length
    ? Spot.SpotImages.find((img) => img.preview)
    : {
        url: "https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg",
      };
  console.log("image", images);

  return (
    Spot && (
      <>
        <div style={{ alignItems: "left", width: "100%" }}>
          <div
            className="singleSpotPage"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}>
            <div style={{ display: "inline-block", width: "50%" }}>
              <h1>{Spot?.name}</h1>
              <FontAwesomeIcon icon={faStar} />
              {` ${Spot?.avgStarRating}  `}
              <>
                <NavLink
                  to="/reviews/spotId"
                  style={{
                    color: "black",
                    fontFamily: "helvetica",
                    fontSize: "9px",
                  }}>
                  Reviews: {Spot.numReviews}{" "}
                </NavLink>
              </>
              <NavLink
                to="/StateMap"
                style={{
                  color: "black",
                  fontFamily: "helvetica",
                  fontSize: "9px",
                }}>
                {Spot.city}
              </NavLink>
              ,
              <NavLink
                to="/stillMapButCountry"
                style={{
                  color: "black",
                  fontFamily: "helvetica",
                  fontSize: "9px",
                }}>
                {Spot.state}
              </NavLink>
              ,
              <NavLink
                to="/maps"
                style={{
                  color: "black",
                  fontFamily: "helvetica",
                  fontSize: "9px",
                }}>
                {Spot.country}
              </NavLink>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "row-reverse",
              }}>
              <NavLink to="/save">
                <FontAwesomeIcon icon={faHeart} /> Save
              </NavLink>
              <NavLink to="/share">
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                Share
              </NavLink>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            {Spot?.SpotImages ? (
              <div
                style={{
                  width: "50%",
                  height: 240,
                  margin: 6,
                  border: "2px solid black",
                }}>
                <img
                  src={images?.url}
                  alt="Preview"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}></img>
              </div>
            ) : (
              <div
                style={{
                  width: "50%",
                  height: "100",
                  margin: 5,
                  border: "2px solid black",
                }}>
                <img
                  src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg"
                  alt="preview"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}></img>
              </div>
            )}
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
              <div
                style={{
                  width: "100%",
                  height: 120,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: "50%",
                    border: "2px solid black",
                    marginBottom: 5,
                    marginRight: 5,
                  }}>
                  pic1
                </div>
                <div
                  style={{
                    width: "50%",
                    border: "2px solid black",
                    marginBottom: 5,
                    marginLeft: 5,
                  }}>
                  pic2
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 120,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: "50%",
                    border: "2px solid black",
                    marginTop: 5,
                    marginRight: 5,
                  }}>
                  pic3
                </div>
                <div
                  style={{
                    width: "50%",
                    border: "2px solid black",
                    marginTop: 5,
                    marginLeft: 5,
                  }}>
                  pic4
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}>
            <div style={{ width: "100%", alignItems: "flex-start" }}>
              <h1 style={{ padding: 0, margin: 0, flexWrap: "nowrap" }}>
                {Spot.name} is Hosted by {Spot.owner?.firstName}
              </h1>
              <ul
                style={{
                  display: "flex",
                  margin: 0,
                  padding: 0,
                  borderBottom: "1px solid black 0.1",
                }}>
                <li style={{ listStyleType: "none" }}>
                  {((Number(Spot.id) * 3) % 6) + 1} guests{" "}
                </li>
                <li style={{ marginLeft: 25 }}>
                  {((Number(Spot.id) * 5) % 6) + 1} bath
                </li>
                <li style={{ marginLeft: 25 }}>
                  {((Number(Spot.id) * 7) % 6) + 1} beds
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div className="scrollables">
            <div>content for scrolling</div>
            <div>more content goes here</div>
            <div>even more content</div>
            <div>some more content</div>
            <div>content baby</div>
          </div>
          <div style={{ width: "50%" }}>
            <BookingsCard spot={Spot}></BookingsCard>
          </div>
        </div>
          <div className="subScroll">under scrollables</div>
      </>
    )
  );
}
