import prisma from "@/lib/db"

export const checkCartExists = async (cart_id)=>{
    const cart = await prisma.cart.findUnique({ where: { id: cart_id } });
    return cart
}

export const checkProductExists = async (product_id)=>{
    const product = await prisma.product.findUnique({ where: { id: product_id } });
    return product
}

export const checkIsProductAlreadyInCart = async (cart_id, product_id)=> {
    const isProductInCart = await prisma.cartProduct.findUnique({
        where:{
          cartId_productId: {
            cartId: cart_id,
            productId: product_id,
          },
        }
      })
      return isProductInCart;
}

export const updateProductQuantity = async (cart_id, product_id, quantity) =>{
    const _product = await prisma.cartProduct.update({
        where:{
          cartId_productId:{
            cartId: cart_id,
            productId:product_id
          }
        },
        data:{
          quantity:Number(quantity)
        }
      })
      return _product;
}