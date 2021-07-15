import React from 'react';
import { useState , useEffect, useRef, useCallback } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'

import { listPlaceEntries } from './API'; 
import PlaceEntryForm from './PlaceEntryForm'

//const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN


export const Map = () => {
    const [places,setPlaces] = useState([]);
    const [showPopup, setShowPopup] = useState({});
    const [addPlaceLocation, setAddPlaceLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: '100%vw',
        height: '100vh',
        latitude: -33.032542,
        longitude: -68.887292,
        zoom: 10
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
      (newViewport) => setViewport(newViewport),
      []
    );



    const getPlaces = async () => {
        const places = await listPlaceEntries();
        setPlaces(places);
      }
    
      useEffect(()=>{
        (async () => {
         getPlaces();
        })();
        
      },[]);

      const showAddPlacePopup = (event) => {
        const [longitude,latitude]= event.lngLat;
        setAddPlaceLocation({
          latitude,
          longitude
        })
      }

      const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );
    
      
      return (
        <div>
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          //onViewportChange={nextViewport => setViewport(nextViewport)}
          onViewportChange={handleViewportChange}
          onDblClick = {showAddPlacePopup}
        >
          {
            places.map(entry => (
              <React.Fragment key = {entry._id}>
              <Marker 
                
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
                closeOnClick={true}
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
              </React.Fragment>
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
                      <PlaceEntryForm onClose= { () => {
                         setAddPlaceLocation(null);
                         getPlaces();
                      }} location={addPlaceLocation}/>
                    </div>
                  </Popup>
                </>
    
    
              ): null
            }
             <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                position="top-right"
              />
          </ReactMapGL>
          </div>
      );
    }
    
    



