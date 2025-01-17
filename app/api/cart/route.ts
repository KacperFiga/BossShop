import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
      const cart = await prisma.cart.create({
        data: {
        },
      });
      return new Response(JSON.stringify({ cart_id: cart.id }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to create cart' }), { status: 500 });
    }
  }
  
  export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ message: "Invalid cart id" }), { status: 400 });
    }

    try {
        const cart = await prisma.cart.findUnique({
            where: {
                id: id,
            },
            include: {
                products: {
                    include: {
                        Product:{
                            include:{
                                images: true
                            }
                        }
                    },
                },
            },
        });

        if (!cart) {
            return new Response(JSON.stringify({ message: "Cart not found" }), { status: 404 });
        }


        return new Response(JSON.stringify({ cart }), { status: 200 });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch cart" }), { status: 500 });
    }
}
