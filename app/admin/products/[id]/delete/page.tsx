import DeleteProductForm from "@/components/products/DeleteProductForm"
import ProductFormNonEditable from "@/components/products/ProductFormNonEditable"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
//import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product) {
        notFound()
    }

    return product
}

export default async function DeleteProductsPage({ params }: { params: { id: string } }) {

    const product = await getProductById(+params.id)

    return (
        <>
            <Heading>Eliminar Producto: {product.name}</Heading>

            <GoBackButton />

            <DeleteProductForm>
                <ProductFormNonEditable
                    product={product}
                />
            </DeleteProductForm>
        </>
    )
}
