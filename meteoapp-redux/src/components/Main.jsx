import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDateTime, setSearch, selectCurrentDateTime, selectSearch } from '../reducers/mainReducer';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Main = () => {
  const currentDateTime = useSelector(selectCurrentDateTime);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/risultati?cerca=' + search);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDateTime = new Date(); // Ottieni la data corrente
      dispatch(setCurrentDateTime({ timestamp: currentDateTime.getTime() })); // Invia il timestamp come payload
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  
  
const formattedDate = new Date(parseInt(currentDateTime, 10)).toLocaleDateString('it-IT', options);
const uppercaseFormattedDate = formattedDate
  .replace(/^\w/, (c) => c.toUpperCase())
  .replace(/\b\w{3,}\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));

const formattedTime = new Date(parseInt(currentDateTime, 10)).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });


  return (
    <div className="app root">
      <div className="search">
        <div>{uppercaseFormattedDate} {formattedTime}</div>
        <div>
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Inserisci la tua località"
            type="text"
          />

          <button onClick={handleSearch} className="btn btn-success">
            Cerca
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
