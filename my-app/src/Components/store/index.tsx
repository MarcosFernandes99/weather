import {combineReducers, createStore} from "redux"
import ModalReducer from "./redux.modal/reducer"

const reducers = combineReducers({
modal: ModalReducer,
})

const store = createStore(reducers)

export default store