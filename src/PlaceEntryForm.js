import React from 'react';
import { useForm } from 'react-hook-form';
import { createPlace } from './API';


const PlaceEntryForm = ({location})=>{
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) =>{
        try{    
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createPlace(data);
            console.log(created);
        }
        catch (error) {
            console.error(error);
        }

    };

    return(
        <div className="form">
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <h5>Completar datos del complejo:</h5>  
        <label htmlFor="name">Nombre: </label>
        <input name="name" required {...register("name")} />
        <label htmlFor="tel">Telefono: </label>
        <input name="tel" required {...register("tel")}/>
        <label htmlFor="material">Superficie: </label>
        <input name="material" required {...register("material")}/>
        <label htmlFor="courtQty">Cantidad de canchas: </label>
        <input name="courtQty" required {...register("courtQty")}/>
        <button>Crear Complejo</button>
    </form>
    </div>
)}

export default PlaceEntryForm;