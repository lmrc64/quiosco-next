"use client"
import { deleteProduct } from "@/actions/delete-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"

export default function DeleteProductForm({children}: {children : React.ReactNode}) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        const response = await deleteProduct(data, id)

        toast.success('Producto Borrado Correctamente')
        router.push('/admin/products')
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >
                {children}
                <input
                    type="submit"
                    className="bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Eliminar Producto'
                />
            </form>
        </div>
    )
}
