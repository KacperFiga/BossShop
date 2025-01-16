import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartI } from "../types";
import { CartProduct } from "@/app/types/index";
import Cookies from 'js-cookie';

interface AddToCartPayload {
    cart_id: string;
    product_id: string;
    quantity: number;
}

export const createCart = createAsyncThunk('createCart', async () => {
    const response = await fetch('/api/cart', { method: 'POST' });
    const data = await response.json();
    return data.cart_id;
});

export const addToCart = createAsyncThunk(
    'AddProduct',
    async ({ product_id, cart_id, quantity }: AddToCartPayload) => {
        try {
            const response = await fetch('/api/cart/product', {
                method: "POST",
                body: JSON.stringify({
                    cart_id,
                    product_id,
                    quantity,
                }),
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
);

const initialState: CartI = {
    cart: {
        id: "",
        products: [],
        total_cost: 0,
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.fulfilled, (state, action: PayloadAction<string>) => {
                state.cart.id = action.payload;
                Cookies.set('cart_id', action.payload);
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProduct>) => {
                state.cart.products.push(action.payload);
            });
    }
});

export default cartSlice.reducer;
export const { setCart } = cartSlice.actions;
