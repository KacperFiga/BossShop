import Image from "next/image";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <Link href={`product/${product.id}`}>
          <div>
            {product.images.map((image) => (
              <Image
                key={image.id}
                src={image.url.replace('view?usp=sharing', 'uc?id=')}
                alt={product.name}
                width={200}
                height={200}
              />
            ))}
          </div>
        </Link>
        </div>
      ))}
    </div>
  );
}
