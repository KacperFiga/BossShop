import prisma from "@/lib/db";
import { createNotification } from "@/lib/notification";
import Cookie from "js-cookie";

interface checkIsProductAlreadyInCartI {
  cart_id: string;
  product_id: string;
}

interface updateProductQuantityI {
  cart_id: string;
  product_id: string;
  quantity: number;
}

interface sendUpdateProductQuantityI {
  product_id: string;
  cart_id: string;
  quantity: number;
}

export const checkCartExists = async (cart_id: string) => {
  const cart = await prisma.cart.findUnique({ where: { id: cart_id } });
  return cart;
};

export const checkProductExists = async (product_id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: product_id },
  });
  return product;
};

export const checkIsProductAlreadyInCart = async ({
  cart_id,
  product_id,
}: checkIsProductAlreadyInCartI) => {
  const isProductInCart = await prisma.cartProduct.findUnique({
    where: {
      cartId_productId: {
        cartId: cart_id,
        productId: product_id,
      },
    },
  });
  return isProductInCart;
};

export const updateProductQuantity = async ({
  cart_id,
  product_id,
  quantity,
}: updateProductQuantityI) => {
  const _product = await prisma.cartProduct.update({
    where: {
      cartId_productId: {
        cartId: cart_id,
        productId: product_id,
      },
    },

    data: {
      quantity: quantity,
    },
  });
  return _product;
};

export const getCart = async () => {
  const cartId = Cookie.get("cart_id");
  if (cartId) {
    const cart = await fetch(`/api/cart?id=${cartId}`, {
      headers: {
        method: "GET",
      },
    })
      .then((response) => response.json())
      .then((cart) => cart)
      .catch((error) => {
        createNotification({ type: "error", message: "Unable to get cart" });
        new Error(error.message);
      });
    return cart;
  } else {
    return null;
  }
};

export const sendUpdateProductQuantity = async ({
  product_id,
  cart_id,
  quantity,
}: sendUpdateProductQuantityI) => {
  const result = await fetch("/api/cart/product", {
    method: "PATCH",
    body: JSON.stringify({
      product_id,
      cart_id,
      quantity,
    }),
  })
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(`something went wrong ${error.message}`);
    });

  return result;
};
