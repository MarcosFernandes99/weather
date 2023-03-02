import { useSelector } from 'react-redux'
import store from '../store'
import { setModal } from '../store/redux.modal/actions'
import "./style.css"

export const ModalDay = () => {

    const modal = useSelector((state: IState) => state.modal) 

    const toggleModal = (value: string) => {
        store.dispatch(setModal(value))
    }

    return (
        <>
            {
                modal?.isOpen === "true" ?

                    <section className='modalContainer'>modal aberto
                        <div className='modal'>
                            <span className='exit' onClick={() => toggleModal("false")}>❌</span>

                        </div>

                    </section> : null
            }

        </>
    )

}
