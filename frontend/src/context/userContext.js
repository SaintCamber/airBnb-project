import {useState, createContext,useContext,useEffect,useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getCurrentUsersReviews} from '../store/Reviews'

// import useState, createContext and useContext from react


export const UserContext = createContext();
export const useUser = () => useContext(UserContext)
export function UserProvider({children}){
    const UserRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentUsersReviews())
    }, [dispatch])
    const userReviews = useSelector(state=>state.Reviews.userReviews)
    const user = useSelector(state=>state.session.user)
    const [currentUser,setCurrentUser] = useState(user)
    const [userReview,setUserReview] = useState(userReviews)

    return (
       <>

       <UserContext.Provider value={{currentUser,setCurrentUser,userReview,setUserReview}}>
            {children}
        </UserContext.Provider>
        <div ref={UserRef}></div>
       </>
    )


}

