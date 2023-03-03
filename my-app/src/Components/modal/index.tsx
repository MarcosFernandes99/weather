import { useSelector } from 'react-redux'
import store from '../store'
import { setModal } from '../store/redux.modal/actions'
import getWeatherList from '../../services/getWeatherList'
import "./style.css"
import { useEffect, useState } from 'react'
import { IDataList } from '../../types/dataList.interface'

export const ModalDay = () => {

    const [response, setResponse] = useState<IDataList[]>([])
    const [currentDayData, setCurrentDayData] = useState<IDataList[] | null>(null)
    const keyCode = "70b0195b4333a58a709b185214fdbcac"
    const modal = useSelector((state: IStateModal) => state.modal)
    const day = useSelector((state: IStateDay) => state.day?.day)
    const city = useSelector((state: IStateCity) => state.city?.cities)

    const toggleModal = (value: string) => {
        store.dispatch(setModal(value))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (city) {
                const result = await getWeatherList(city, keyCode)
                setResponse(result)
            }
        }
        fetchData()
    }, [city])

    useEffect(() => {
        if (response.length > 0 && day) {
            const matchinDays = response.filter((data) => data.data.substring(0, 10) === day)
            setCurrentDayData(matchinDays)
        } else {
            setCurrentDayData(null)
        }
    }, [response, day])

    console.log(day)
    console.log(response)
    console.log(currentDayData)

    return (
        <>
            {modal?.isOpen === "true" ? (
                <section className="modalContainer">
                    <div className="modal">
                        {currentDayData && (
                            <div className='parent'>
                                <span className="exit" onClick={() => toggleModal("false")}>❌</span>

                                <div className="tempDayContainer">
                                    <span className='tempDay'>{currentDayData[0].tempDay.toFixed(0)}°</span>
                                    <span className='tempDayOther'>⬆{currentDayData[0].tempMax.toFixed(0)}°</span>
                                    <span className='tempDayOther'>⬇{currentDayData[0].tempMin.toFixed(0)}°</span>  
                                </div>                              
                                
                                <div className="alongTheDay">bbbbb</div>
                            </div>
                        )}
                    </div>
                </section>
            ) : null}
        </>
    );
}
