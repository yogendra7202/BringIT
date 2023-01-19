import { Add_An_Address, Remove_An_Address } from "./ActionType";

const initialState = {
    address: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Add_An_Address:
            return { address: [...state.address, action.payload] }

        case Remove_An_Address:
            const deletedArray = state.address.filter((item, index) => {
                return index !== action.payload
            })
            return { address: deletedArray }

        default:
            return state
    }
}