import {useDispatch,useSelector} from 'react-redux'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
import {updateSearch} from '../../store/search.js'

export default function SpotSearch(){
   let dispatch=useDispatch()
   let spotsList = useSelector(state=>state.Search.search)
   
   useEffect(()=>{},[spotsList])


   return (
    
    <div style={{border:"none",backgroundColor:"white",
    display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",width:'100%',gap:"60px 2px"}}>
            {Object.values(spotsList).reverse().map((spot)=>
            <SpotListItem key={spot.id} spot={spot}/>
            )}
    </div>


)
}