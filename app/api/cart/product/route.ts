import prisma from "@/lib/db"

export const GET = async () =>{
    return new Response(JSON.stringify({'message':'GET method not allowed'}),{status:400})
}

export const POST = async (req: Request) => {
    const body = await req.json();
    try{
        const { cart_id, product_id, quantity } = body

      const product = await prisma.$transaction(async (prisma) => {
        const cart = await prisma.cart.findUnique({ where: { id: cart_id } });
        if (!cart) throw new Error("Cart not found");
      
        const product = await prisma.product.findUnique({ where: { id: product_id } });
        if (!product) throw new Error("Product not found");

      
        return await prisma.cartProduct.create({
          data: {
            cartId: cart_id,
            productId: product_id,
            quantity: Number(quantity),
          },
        });
      });
      

        console.log(product);

        return new Response(JSON.stringify({'product':product }),{status:200})

    }catch(err){
        console.log(err)
        return new Response(JSON.stringify({'message':err}),{status:400})

    }
}

export const DELETE = async (req: Request) => {
  const body = await req.json();
  const { cart_id, product_id } = body;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const cartProduct = await prisma.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId: cart_id,
            productId: product_id,
          },
        },
      });

      if (!cartProduct) {
        throw new Error("Product not found in cart.");
      }

      return await prisma.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId: cart_id,
            productId: product_id,
          },
        },
      });
    });

    return new Response(JSON.stringify({ message: "Product removed successfully", result }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: error.message || "Unable to delete product" }), { status: 400 });
  }
};
