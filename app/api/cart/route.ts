import { PrismaClient } from "@prisma/client";

import { CartProduct } from "@/app/types";

const prismaCart = new PrismaClient().$extends({
  result: {
    cart: {
      total_products: {
        compute(cart: CartProduct) {
          if (cart.products.length > 0) {
            const total = cart.products.reduce((sum, cartProduct) => {
              const price =
                cartProduct.Product.promo_price > 0
                  ? cartProduct.Product.promo_price
                  : cartProduct.Product.regular_price;
              return sum + price * cartProduct.quantity;
            }, 0);
            return total;
          } else {
            return 0;
          }
        },
      },
    },
  },
});

export async function POST(req: Request) {
  try {
    const cart = await prismaCart.cart.create({
      data: {},
    });
    return new Response(JSON.stringify({ cart_id: cart.id }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create cart" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ message: "Invalid cart id" }), {
      status: 400,
    });
  }

  try {
    const cart = await prismaCart.cart.findUnique({
      where: {
        id: id,
      },
      include: {
        products: {
          include: {
            Product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const { total } = cart;
    console.log(total, "total");

    return new Response(JSON.stringify({ cart, total }), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), {
      status: 500,
    });
  }
}
