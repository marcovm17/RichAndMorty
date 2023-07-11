import { useEffect, useState } from 'react'
import './App.css'

import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormLocation from './components/FormLocation'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import logo from './assets/r&mlogo.png'
import useFetch from './hooks/useFetch'

function App() {
  const [idlocation, setIdlocation] = useState(getRandomNumber(126))
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 8;

  const url = `https://rickandmortyapi.com/api/location/${idlocation}`;
  const [ location, getSingleLocation, hasError, isLoading ] = useFetch(url)

  useEffect(() => {
    getSingleLocation()
  }, [idlocation]);

  const paginateResidents = () => {
    const startIndex = (currentPage - 1) * residentsPerPage;
    const endIndex = startIndex + residentsPerPage;
    return location?.residents.slice(startIndex, endIndex);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const totalPages = Math.ceil(location?.residents.length / residentsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Rick and Morty Logo" style={{ width: '380px' }} />
      </div>
      <FormLocation setIdlocation={setIdlocation} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : hasError ? (
        <h1>❌ Hey! You must provide an id from 1 to 126 😢</h1>
      ) : (
        <>
          <div style={{ padding: '1em', display: 'flex', justifyContent: 'center' }}>
            <LocationInfo location={location} />
          </div>
          <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            {pageNumbers.map((pageNumber) => (
              <button 
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}
            <button 
              onClick={goToNextPage}
              disabled={location?.residents.length <= currentPage * residentsPerPage}
            >
              Siguiente
            </button>
          </div>
          <div className="resident-container" style={{ padding: '1em' }}>
            {paginateResidents()?.map(url => (
              <ResidentCard 
              key={url} 
              url={url} />
            ))}
          </div>
          <div className="pagination">
            {pageNumbers.map((pageNumber) => (
              <button 
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <div className="pagination" >
            <button  onClick={goToPreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <button 
              onClick={goToNextPage}
              disabled={location?.residents.length <= currentPage * residentsPerPage}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}


  export default App
