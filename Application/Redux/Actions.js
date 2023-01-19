import { Add_An_Address, Add_To_Cart, Add_To_Wishlist, Fetch_Wishlist, Remove_An_Address, Remove_From_Cart, Remove_From_Wishlist } from "./ActionType";

export const fetchWishlist = () => ({
    type: Fetch_Wishlist
})

export const addToWishlist = data => ({
    type: Add_To_Wishlist,
    payload: data
})

export const removeFromWishlist = key => ({
    type: Remove_From_Wishlist,
    payload: key
})

export const addToCart = data => ({
    type: Add_To_Cart,
    payload: data
})

export const removeFromCart = key => ({
    type: Remove_From_Cart,
    payload: key
})

export const addAnAddress = data => ({
    type: Add_An_Address,
    payload: data
})

export const removeAnAddress = key => ({
    type: Remove_An_Address,
    payload: key
})