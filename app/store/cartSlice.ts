import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartI } from "../types";

const initialState: CartI = {
    cart: {
        id: "",
        products: [{
            id: '',
            Product: '',
            cartId: "",
            productId: "",
            quantity: 0,
            Cart: ""
        }
        ],
        total_cost: 0,
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
});

// export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;
