import {useDispatch,useSelector} from 'react-redux'
import { populateAllSpots } from '../../store/Spots'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBus,faHeadSideCough} from '@fortawesome/free-solid-svg-icons'
import './SpotsList.css'
export default function SpotsList(){
   let dispatch=useDispatch()

   useEffect( ()=>{
       dispatch(populateAllSpots())
    },[dispatch])
    const spotsList = useSelector((state)=>Object.values(state.spots.AllSpots))
    console.log('spotsList',spotsList)
    return (
        <>
        <div style={{width:'100%',height:50,position:'sticky',top:60}}>
        <div class="icon-bar">
  <a class="active" href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
  <a href="#"><FontAwesomeIcon icon={faBus}/></a>
</div>
        </div>
        <div style={{border:"none",backgroundColor:"white",
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",width:'100%'}}>
                {spotsList.map((spot)=>
                <SpotListItem key={spot.id} spot={spot}/>
                )}
        </div>

        </>
    )
}