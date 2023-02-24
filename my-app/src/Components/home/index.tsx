import React, { useState } from 'react'
import "./style.css"


// 70b0195b4333a58a709b185214fdbcac

export const Container = () => {

    const [city, setCity] = useState<string>()    
    

    const searchCity = () => {
        console.log(city)
    }


    return (
        <section className='container'>
            <div className='search'>
                <input onChange={(e) => setCity(String(e.target.value))} className='city-input' type="text" placeholder='Digite o nome da cidade' />
                <button className='btnSearch' onClick={searchCity}>Pesquisar</button>
            </div>
        </section>

    )
}
