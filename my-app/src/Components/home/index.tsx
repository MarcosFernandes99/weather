import { useState } from 'react'
import axios from 'axios'
import "./style.css"

export const Container = () => {

    const [city, setCity] = useState<string>('')
    const [dataApi, setDataApi] = useState<IWeather>({})

    const keyCode = "70b0195b4333a58a709b185214fdbcac"

    const searchCity = async () => {
        const response = await getWeatherData(city, keyCode)
        const filterData = filterWeatherData(response.data)
        setDataApi(filterData)
    }

    const filterWeatherData = (data: any) => {
        const filterData = data.list.reduce((result: any, item: any) => {
            const date = item.dt_txt.split(' ')[0];
            const dateBr = date.split('-').reverse().join('/')
            if (!result[dateBr]) {
                result[dateBr] = {
                    data: dateBr,
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    description: item.weather[0].description,
                };
            }
            return result;
        }, {});
        console.log(filterData)
        return filterData;
    };

    const getWeatherData = async (city: any, keyCode: string) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyCode}&units=metric&lang=pt`)
        console.log(res)
        return res
    }

    return (

        <section className='container'>
            <h1 className="title">Previsão do tempo</h1>
            <div className='search'>
                <input onChange={(e) => setCity(String(e.target.value))} className='city-input' type="text" placeholder='Digite o nome da cidade' />
                <button className='btnSearch' onClick={searchCity}>🔎</button>
            </div>
            <h3 className='week'>Próxima semana:</h3>
            <div className="containerDays">
                {Object.keys(dataApi).map((key) => {
                    const { data, description, temp_max, temp_min } = dataApi[key];
                    return (
                        <div className='days' key={data}>
                            <span className='day'>{data}</span>
                            <span className='day tempMax'>⬆ {temp_max.toFixed(0)}°</span>
                            <span className='day tempMin'>⬇ {temp_min.toFixed(0)}° </span>
                            <span className='day'>{description}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
