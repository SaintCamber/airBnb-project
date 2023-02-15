import {useEffect,useState,useHistory}from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
  } from "@fortawesome/free-solid-svg-icons";
import CreateReviewModal from './CreateReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import {getSpotReviews } from '../../store/Reviews';
import { useModal } from '../../context/Modal';
import './index.css'
const Reviews = ({spot}) => {
    const {closeMenu} = useModal()
    const singleSpotReviews = useSelector(state=>state.Reviews.spotReviews)
    const currentUser = useSelector(state=>state.session.user)
    const userReviews = useSelector(state=>state.Reviews.userReviews)
    const dispatch=useDispatch()
    const {spotId} = useParams()
    useEffect(()=>{
        dispatch(getSpotReviews(spotId))
    },[dispatch,userReviews])
    return (
        <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
        <h2>User Reviews</h2>
        {currentUser.id!==spot.ownerId && !Object.values(singleSpotReviews).find(review=>currentUser.id===review.User.id) ? (
            <OpenModalMenuItem
    className="modalButton"
    
    itemText={<button>Add A Review</button>}
    onItemClick={closeMenu}
    modalComponent={<CreateReviewModal spotId={spotId} userId={currentUser.id}/>}/>):('')}
        <div className="reviewContainer">
        {
            Object.values(singleSpotReviews).map(review=>{
                return (
                    <div className="reviewTile">

                        <div className="reviewBox">
                        <div className='reviewStars'><FontAwesomeIcon icon={faStar}/>
                        <div style={{marginRight:"7vw"}}>{review.stars}</div>
                        <div>{review.User.firstName} {review.User.lastName}</div>
                        </div>
                        <div>{review.createdAt.split("T")[0]}</div>
                        
                       <div className="TextDiv"> {review.review}</div>
                       {currentUser.id === review.User.id ? <button>edit</button>:""}
                       {currentUser.id === review.User.id ? <button>delete</button>:""}
                        </div>
                    </div>
                )
            })
        }
            
        </div>
        </div>
    );
};


export default Reviews;
