import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartI } from "../types";
import { CartProduct } from "@/app/types/index";
import Cookies from "js-cookie";
import { createNotification } from "@/lib/notification";

interface AddToCartPayload {
  cart_id: string;
  product_id: string;
  quantity: number;
}

interface RemoveFromCartPayload {
  productId: string;
}

interface removeProductFromCartPropsI {
  product_id: string;
  cart_id: string;
}

export const createCart = createAsyncThunk("createCart", async () => {
  const response = await fetch("/api/cart", { method: "POST" });
  const data = await response.json();
  return data.cart_id;
});

export const addToCart = createAsyncThunk(
  "AddProduct",
  async ({ product_id, cart_id, quantity }: AddToCartPayload) => {
    try {
      const response = await fetch("/api/cart/product", {
        method: "POST",
        body: JSON.stringify({
          cart_id,
          product_id,
          quantity,
        }),
      });
      const { product } = await response.json();
      createNotification({ type: "success", message: "Product added to cart" });
      return product;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "removeProductFromCart",
  async ({ product_id, cart_id }: removeProductFromCartPropsI) => {
    await fetch("/api/cart/product", {
      method: "DELETE",
      body: JSON.stringify({
        cart_id,
        product_id,
      }),
    })
      .then((response) => {
        createNotification({
          type: "success",
          message: "Product removed from cart",
        });
        return response;
      })
      .catch((error) => {
        createNotification({
          type: "error",
          message: "Unable to remove product from cart",
        });
        throw Error(error.message);
      });

    return { productId: product_id };
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
    changeProductQty(state, action) {
      const { product_id, quantity } = action.payload;

      const productIndex = state.cart.products.findIndex(
        (product) => product.productId === product_id
      );

      if (productIndex !== -1) {
        state.cart.products[productIndex] = {
          ...state.cart.products[productIndex],
          quantity,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.cart.id = action.payload;
        Cookies.set("cart_id", action.payload);
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartProduct>) => {
          state.cart.products.push(action.payload);
        }
      )
      .addCase(
        removeProductFromCart.fulfilled,
        (state, action: PayloadAction<RemoveFromCartPayload>) => {
          state.cart.products = state.cart.products.filter(
            (product) => product.productId !== action.payload.productId
          );
        }
      );
  },
});

export default cartSlice.reducer;
export const { setCart, changeProductQty } = cartSlice.actions;
