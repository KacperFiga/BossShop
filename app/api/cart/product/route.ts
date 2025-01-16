import { checkCartExists, checkIsProductAlreadyInCart, checkProductExists, updateProductQuantity } from "@/app/utils/cart"
import prisma from "@/lib/db"


export const GET = async () =>{
    return new Response(JSON.stringify({'message':'GET method not allowed'}),{status:400})
}

export const POST = async (req: Request) => {
    const body = await req.json();
    try{
        const { cart_id, product_id, quantity } = body

        const product = await prisma.$transaction(async (prisma) => {
        const cart = checkCartExists(cart_id);
        if (!cart) throw new Error("Cart not found");
      
        const productExists = await checkProductExists(product_id)
        if (!productExists) throw new Error("Product not found");
        
        const isProductAlreadyInCart = await checkIsProductAlreadyInCart({cart_id, product_id});
        if(isProductAlreadyInCart){
          throw new Error('To update product quantity in cart, use patch method')
        }


        console.log(cart_id, product_id)
      
        return await prisma.cartProduct.create({
          data: {
            cartId: cart_id,
            productId: product_id,
            quantity: Number(quantity),
          },
        });
      });

        return new Response(JSON.stringify({'product':product }),{status:201})

    }catch(err){
        console.error(err.message)
        return new Response(JSON.stringify({'message':err.message}),{status:400})

    }
}

export const DELETE = async (req: Request) => {
  const body = await req.json();
  const { cart_id, product_id } = body;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const productExists = await checkProductExists(product_id)
      if (!productExists) throw new Error("Product not found");
      
      const isProductAlreadyInCart = await checkIsProductAlreadyInCart({cart_id, product_id});

      if (!isProductAlreadyInCart) {
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

export const PATCH = async (req: Request) => {
  const body = await req.json();
  try {
    const { product_id, cart_id, quantity } = body;

    const cart = await checkCartExists(cart_id);
    if (!cart) throw new Error("Cart not found");

    const productExists = await checkProductExists(product_id);
    if (!productExists) throw new Error("Product not found");

    const isProductInCart = await checkIsProductAlreadyInCart({cart_id, product_id});

    if (isProductInCart) {
      const updatedProduct = await updateProductQuantity({cart_id, product_id, quantity:Number(quantity)});
      return new Response(JSON.stringify({ 'product': updatedProduct }), { status: 201 });
    }

  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ 'message': "Something went wrong" }), { status: 500 });
  }
};
