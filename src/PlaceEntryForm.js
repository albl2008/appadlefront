import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPlace } from './API';


const PlaceEntryForm = ({location, onClose})=>{
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) =>{
        try{   
            setLoading(true); 
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createPlace(data);
            onClose();
        }
        catch (error) {
            console.error(error);
            setError(error.message)
            setLoading(false)
        }
        
    };

    return(
        <div className="form">
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        {error ? <h3> {error} </h3>: null }
        <h5>Completar datos del complejo:</h5>  
        <label htmlFor="name">Nombre: </label>
        <input name="name" required {...register("name")} />
        <label htmlFor="tel">Telefono: </label>
        <input name="tel" required {...register("tel")}/>
        <label htmlFor="material">Superficie: </label>
        <input name="material" required {...register("material")}/>
        <label htmlFor="courtQty">Cantidad de canchas: </label>
        <input name="courtQty" required {...register("courtQty")}/>
        <button disabled={loading}>{loading ? 'Loading...' : 'Crear Complejo'}</button>
    </form>
    </div>
)}

export default PlaceEntryForm;