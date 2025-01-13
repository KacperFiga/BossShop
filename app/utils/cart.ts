import prisma from "@/lib/db"

interface checkIsProductAlreadyInCartI {
  cart_id: string,
  product_id: string
}

interface updateProductQuantityI {
  cart_id: string,
  product_id: string,
  quantity: number
}


export const checkCartExists = async (cart_id:string)=>{
    const cart = await prisma.cart.findUnique({ where: { id: cart_id } });
    return cart
}

export const checkProductExists = async (product_id:string)=>{
    const product = await prisma.product.findUnique({ where: { id: product_id } });
    return product
}

export const checkIsProductAlreadyInCart = async ({cart_id, product_id}: checkIsProductAlreadyInCartI)=> {
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

export const updateProductQuantity = async ({cart_id, product_id, quantity}:updateProductQuantityI) =>{
    const _product = await prisma.cartProduct.update({
        where:{
          cartId_productId:{
            cartId: cart_id,
            productId:product_id
          }
        },
        data:{
          quantity: quantity
        }
      })
      return _product;
}