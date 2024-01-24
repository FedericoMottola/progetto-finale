import '../index.css'
import Nf from "../components/404";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])

    return (
        <div className='app root'>
            <Nf />
        </div>
    )
}


export default NotFound