
const [labelClass,setLabelClass]=useState("")
const [labelId,setLabelId]=useState(0)

export default function handleLabelOnclick(e){
    if(!e.target.id===labelId){
        setLabelId(e.target.id)

    }
}