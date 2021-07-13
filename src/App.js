import * as React from 'react';
import { useState , useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';


import { listPlaceEntries } from './API'; 
import PlaceEntryForm from './PlaceEntryForm'

const App =  ()=> {
  const [places,setPlaces] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addPlaceLocation, setAddPlaceLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3
  });

  useEffect(()=>{
    (async () => {
     const places = await listPlaceEntries();
     setPlaces(places);
     console.log(places);
    })();
    
  },[]);

  const showAddPlacePopup = (event) => {
    const [longitude,latitude]= event.lngLat;
    setAddPlaceLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick = {showAddPlacePopup}
    >
      {
        places.map(entry => (
          <>
          <Marker 
            key = {entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            >
              <div
              onClick={()=> setShowPopup({
                //...showPopup,
                [entry._id]: true,
  
                })}
              >
           <svg 
              className = "marker red" 
              style = {{
                width: `${6*viewport.zoom}px`,
                height: `${6*viewport.zoom}px`,
              }}
              viewBox="0 0 24 24" 
            
              >
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
             <circle cx="12" cy="10" r="3"></circle>
           </svg>
           </div>
          </Marker>
          {
            showPopup[entry._id] ? (
          <Popup
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setShowPopup({})}
            anchor="top" >
            <div className = "popup">
              <h3>{entry.name}</h3>
              <h4>Rating: {entry.rating}/5</h4>
              <h4>Tel: {entry.tel}</h4>
              <button>Consultar</button>
            </div>
          </Popup>
          ) : null
          }
          </>
        ))
      }
        {
          addPlaceLocation ? (
            <>
             <Marker 
            latitude={addPlaceLocation.latitude} 
            longitude={addPlaceLocation.longitude} 
            >
              <div>
           <svg 
              className = "marker yellow" 
              style = {{
                width: `${6*viewport.zoom}px`,
                height: `${6*viewport.zoom}px`,
              }}
              viewBox="0 0 24 24" 
            
              >
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
             <circle cx="12" cy="10" r="3"></circle>
           </svg>
           </div>
          </Marker>
               <Popup
                latitude={addPlaceLocation.latitude} 
                longitude={addPlaceLocation.longitude} 
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddPlaceLocation(null)}
                anchor="top" >
                <div className = "popup">
                  <PlaceEntryForm location={addPlaceLocation}/>
                </div>
              </Popup>
            </>


          ): null
        }
      </ReactMapGL>
  );
}


export default App;

