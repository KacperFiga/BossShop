import prisma from "@/lib/db";

const calculateAvgRatingProduct = (reviews) => reviews.length === 1 ? reviews[0].rating : reviews.reduce((a,b)=> a + b.rating/reviews.length,0)



export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: "ID parameter is missing" }), { status: 400 });
    }

    const product = await prisma.product.findFirst({
        where: { id: id },
        include: {
            images: true,
            categories: true,
            Product_details: true,
            reviews: true
        }
    });

    
    const avgReview = calculateAvgRatingProduct(product?.reviews)

    if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    } 

    return new Response(JSON.stringify({...product, avgReview}), { status: 200 });
}
