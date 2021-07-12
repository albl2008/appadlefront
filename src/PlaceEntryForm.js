import React from 'react'

const PlaceEntryForm = ()=>{
    return(
    <form className="entry-form">
        <h3>Agregar complejo</h3>
        <label for="name">Nombre: </label>
        <input name="name"/>
        <label for="tel">Telefono: </label>
        <input name="tel"/>
        <label for="material">Superficie: </label>
        <input name="material"/>

    </form>
)}

export default PlaceEntryForm;