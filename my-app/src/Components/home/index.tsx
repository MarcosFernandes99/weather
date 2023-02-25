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
        const filteredData = data.list.reduce((result: any, item: any) => {
            const date = item.dt_txt.split(' ')[0];
            if (!result[date]) {
                result[date] = {
                    data: date,
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    description: item.weather[0].description,
                };
            }
            return result;
        }, {});
        return filteredData;
    };

    const getWeatherData = async (city: any, keyCode: string) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyCode}&units=metric`)
        return res
    }

    return (

        <section className='container'>
            <div className='search'>
                <input onChange={(e) => setCity(String(e.target.value))} className='city-input' type="text" placeholder='Digite o nome da cidade' />
                <button className='btnSearch' onClick={searchCity}>Pesquisar</button>
            </div>
            <h3 className='week'>Next Week:</h3>
            <div className="days">
                {Object.keys(dataApi).map((key) => {
                    const { data, description, temp_max, temp_min } = dataApi[key];
                    return (
                        <div key={data}>
                            <p className='day'>{data}</p>
                            <p>Max Temperature: {temp_max}</p>
                            <p>Min Temperature: {temp_min}</p>
                            <p>Description: {description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
