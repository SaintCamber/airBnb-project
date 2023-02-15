import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from "../../store/Spots";
import { useEffect ,useState} from "react";
import { useParams ,useHistory, NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import BookingsCard from "../BookingsCard";
import "./SingleSpot.css";
import Reviews from "../Reviews";
// import amenitiesTile from "../amenitiesTile";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import DeleteSpotModal from "../DeleteSpotModal";
// import UpdateSpotModal from "../UpdateSpotModal";
export default function SingleSpot() {
  let params = useParams();
  let spotId =parseInt(params.spotId);
  let Spot = useSelector((state) => state.spots.SingleSpot);
 const history = useHistory()
  let SpotList = useSelector((state) => state.spots.AllSpots);
  let currentUser = useSelector((state)=>state.session.user)
  const [showMenu, setShowMenu] = useState(false);

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
  const allImages = Spot?.SpotImages?.length? [...Spot.SpotImages]: {
    url: "https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg",
  };
  console.log(allImages)
  const images = Spot?.SpotImages?.length
    ? Spot.SpotImages.find((img) => img.preview)
    : {
        url: "https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg",
      };
  console.log("image", images);
  const closeMenu = () => setShowMenu(false);

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
            <div style={{ display: "inline-block", width: "50%", }}>
              <h1>{Spot?.name}</h1>
              <>
              <FontAwesomeIcon icon={faStar} />
              {Math.floor(Spot?.avgStarRating*100)/100||"new"  }
                <p
                  to="/reviews/spotId"
                  style={{
                    color: "black",
                    fontFamily: "helvetica",
                    fontSize: "9px",
                    margin:0,
                    marginLeft:"5px",
                    display:"inline-flex",
                  }}>
                  Reviews: {Spot.numReviews}
                </p>
              </>
              <NavLink
                to="/maps"
                style={{
                  color: "black",
                  fontFamily: "helvetica",
                  fontSize: "9px",
                  marginLeft:"5px"
                }}>
                {Spot.city}
              </NavLink>
              ,
              <NavLink
                to="/maps"
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

             
              <div className="saveShare"  onClick={()=>alert('Feature coming soon, please check back later')}>
                <FontAwesomeIcon icon={faHeart} /> Save
              </div>
              <div className="saveShare" onClick={()=>alert('Feature coming soon, please check back later')} >
                <FontAwesomeIcon icon={faArrowUpFromBracket} /> Share

              </div>
              
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
                  height: "412px",
                  margin: 4,
                  
                }}>
                <img
                  src={images?.url}
                  alt="Preview"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderTopLeftRadius:"15px",
                  borderBottomLeftRadius:"15px",
                  }}></img>
              </div>
            ) : (
              <div
                style={{
                  width: "50%",
                  height: "100",
                  margin: 2,
                }}>
                <img
                  src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg"
                  alt="preview"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderTopLeftRadius:"15px",
                  borderBottomLeftRadius:"15px",
                  }}></img>
              </div>
            )}
            <div
              style={{
                width: "50%",
                height: "412px",
                display: "flex",
                flexDirection: "column",
              }}>
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: "50%",
                    marginBottom: 2,
                    marginRight: 2,
                  }}>

                  {allImages[1]? <img src={allImages[1].url} style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%"}} alt='image1'></img>:<img src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg" alt="image1" style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%"}} ></img>}
                </div>
                <div
                  style={{
                    width: "50%",
                    marginBottom: 2,
                    marginLeft: 2,
                  }}>
                  
                  {allImages[2]? <img src={allImages[2].url} style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderTopRightRadius:"15px",
                    
                    }} alt='image1'></img>:<img src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg" alt="image1" style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderTopRightRadius:"15px",
                    
                    }} ></img>}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: "50%",
                    marginTop: 2,
                    marginRight: 2
                  }}>
                  
                  {allImages[3]? <img src={allImages[3].url} style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%"}} alt='image1'></img>:<img src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg" alt="image1" style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    }} ></img>}
                </div>
                <div
                  style={{
                    width: "50%",
                    marginTop: 2,
                    marginLeft: 2,
                  }}>
                  
                  {allImages[4]? <img src={allImages[4].url} style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  borderBottomRightRadius:"15px",
                    }} alt='image1'></img>:<img src="https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg" alt="image1" style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%"}} ></img>}
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
              marginTop:"30px"
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
            <div className="ScrollDiv" style={{marginTop:"20px"}}>
            <div className={'containerDiv'}>
        <div className={'IconDiv'}>
           <FontAwesomeIcon icon={'fa-moon'} className="iconic fa-xl"/>
        </div>
        <div className={'TextDiv'}>
            <h4>{`Moonlight`}</h4>
            <p>{`shocking as it may be the moon works on this planet`}</p>
            </div>
            
        </div>

        <div className={'containerDiv'}>
        <div className={'IconDiv'}>
           <FontAwesomeIcon icon={'fa-sun'} className="iconic fa-xl"/>
        </div>
        <div className={'TextDiv'}>
            <h4>{`Sunlight`}</h4>
            <p>{`this planet is orbiting a yellow star-the inhabitants call it sol`}</p>
            </div>
            
        </div>

        <div className={'containerDiv'}>
        <div className={'IconDiv'}>
           <FontAwesomeIcon icon={'fa-water'} className="iconic fa-xl"/>
        </div>
        <div className={'TextDiv'}>
            <h4>{`Water`}</h4>
            <p>{`a liquid ocean supports the life found on this planet`}</p>
            </div>
            
        </div>
            </div>
            <div className="ScrollDiv"><div className='coverContainer'>
            <span className='cover'><span className="placeHolderRed">Infini</span>Cover</span><span className='bookingProt'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
                <div onClick={()=>(history.push('/learn'))} className="learn">learn more</div>
            </div>
            </div>
            <div className="ScrollDiv"><p>
              {Spot.description}
            </p></div>
            <div className="ScrollDiv">Additional Pictures of the property,maybe just one of them and a button to move between them?</div>
            <div className="ScrollDiv">the rest of the amenities available at the location, the 3 deemed most important will replace the three displayed above?</div>
          </div>
          <div style={{ width: "40%" }}>
            <BookingsCard spot={Spot}></BookingsCard>
          </div>
        </div>
          <div className="subScroll">
            {currentUser ? <Reviews spot={Spot}></Reviews>:"log in to see reviews"}
          </div>
      </>
    )
  );
}
