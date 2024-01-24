import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css'




const Main = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate('/risultati?cerca=' + search)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Aggiorna ogni secondo

        return () => clearInterval(intervalId); // Pulisci l'intervallo quando il componente viene smontato
    }, []); // Esegui solo al mount
 
    const options = { weekday: 'short', month: 'short', day: 'numeric'  };
    const formattedDate = currentDateTime.toLocaleDateString('it-IT', options);
    const uppercaseFormattedDate = formattedDate
        .replace(/^\w/, (c) => c.toUpperCase()) // Capitalizza la prima lettera del giorno
        .replace(/\b\w{3,}\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1)); // Capitalizza la prima lettera di ogni parola nel mese

        const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        
        <div className='app root'>
           
        <div className="search">
        <small>{uppercaseFormattedDate} {formattedTime}</small>
        <input
        value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder='Inserisci la tua località'
        type="text" />
     
 
         
            <button onClick={handleSearch} className="btn btn-success">Cerca</button>
            
        </div>
        </div>
        
    )
    
}

export default Main


