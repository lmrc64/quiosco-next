"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function deleteProduct(data: unknown, id: number) {
    //const result = ProductSchema.safeParse(data)

    /*if(!result.success) {
        return {
            errors: result.error.issues
        }
    }*/

    await prisma.orderProducts.deleteMany({
        where: {
            productId: id
        }
    })

    await prisma.product.delete({
        where: {
            id
        }
    })
    revalidatePath('/admin/products')
}