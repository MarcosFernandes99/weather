const VALUE_INITIAL_STATE = {
    list: []
}

const getDataList = (state = VALUE_INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case "SET_DATA_LIST":
            return {
                ...state,
                aaa: action.payload
            }

        default:
            return state
    }
}

export default getDataList