import { Add_To_Cart, Remove_From_Cart } from "./ActionType"

const cart = {}

export default (state = cart, action) => {
    switch (action.type) {
        case Add_To_Cart:
            return state;
        case Remove_From_Cart:
            return state;
        default:
            console.log("cart3")
            return state;
    }
}