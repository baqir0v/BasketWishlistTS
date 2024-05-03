import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { BasketContext } from "../../Context/basketContex";
import { WishlistContext } from "../../Context/wishlistContext";

interface Category {
    id: number;
    name: string;
    description: string;
}

function Data() {
    const [data, setData] = useState<Category[]>([])
    const [nameInput, setNameInput] = useState<string>("")
    const [descInput, setDescInput] = useState<string>("")
    const { basket } = useContext(BasketContext)
    const { addBasket } = useContext(BasketContext)
    const { deleteBasket } = useContext(BasketContext)
    const { incrementBasket } = useContext(BasketContext)
    const { decrementBasket } = useContext(BasketContext)
    const { wishlist } = useContext(WishlistContext)
    const { addWishlist } = useContext(WishlistContext)
    const [wishlistOpen, setWishlistOpen] = useState<boolean>(false)
    
    


    const fetchData = async () => {
        const res = await fetch("http://localhost:3000/categories")
        const jsonData = await res.json()
        setData(jsonData)
    }

    const deleteData = async (id: number) => {
        await axios.delete(`http://localhost:3000/categories/${id}`)
        fetchData()
    }

    const addData = async () => {
        try {
            const response = await fetch("http://localhost:3000/categories")
            const jsonData = await response.json()
            const idValue = jsonData.length

            await axios.post("http://localhost:3000/categories", {
                id: idValue + 1,
                name: nameInput,
                description: descInput
            })

            fetchData()
            setNameInput("")
            setDescInput("")
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpener = () => {
        setWishlistOpen(!wishlistOpen)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex">
            <div className="flex flex-col border border-black w-2/3 p-5">
                <div className="flex gap-3">
                    <form className="flex gap-5"
                        action="" onSubmit={(e) => {
                            e.preventDefault()
                            addData()
                        }}>
                        <input
                            className="border border-black p-1"
                            type="text"
                            placeholder="Name"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                        <input
                            className="border border-black p-1"
                            type="text"
                            placeholder="Descripton"
                            value={descInput}
                            onChange={(e) => setDescInput(e.target.value)}
                        />
                        <button className="bg-blue-600 px-6 text-white rounded-md">Add</button>
                    </form >
                    <button className="bg-blue-600 px-6 text-white rounded-md"
                        onClick={handleOpener}>Open {wishlistOpen ? "Basket" : "Wishlist"}</button>
                </div>

                <div>
                    {data && data
                        .sort((a, b) => a.id - b.id)
                        .map((item) => (
                            <ul key={item.id} className="flex flex-col gap-1">
                                <li>{item.id})</li>
                                <li>Name:{item.name}</li>
                                <li>Description:{item.description}</li>
                                <li><button className="bg-red-600 px-2 py-1 text-sm text-white"
                                    onClick={() => deleteData(item.id)}>Delete</button></li>
                                <li><button className="bg-blue-600 px-2 py-1 text-sm text-white"
                                    onClick={() => addBasket(item)}>Basket</button></li>
                                <li><button className="bg-blue-600 px-2 py-1 text-sm text-white"
                                    onClick={() => addWishlist(item)}>Wishlist</button></li>
                            </ul>
                        ))}
                </div>
            </div>

            <div className={!wishlistOpen ? "w-1/3 p-2" : "hidden"}>
                <h1 className="text-5xl">Basket</h1>
                {basket && basket.map((item, index) => (
                    <ul className="flex flex-col gap-2" key={item.id}>
                        <li>{index + 1})</li>
                        <li>Name:{item.name}</li>
                        <li>Description:{item.description}</li>
                        <li>Count:{item.count}</li>
                        <li><button className="bg-red-600 px-2 py-1 text-sm text-white"
                            onClick={() => deleteBasket(item)}>Delete</button></li>
                        <li><button className="flex justify-center items-center text-white bg-blue-500 w-[30px] h-[30px] hover:bg-blue-400" 
                        onClick={()=> incrementBasket(item)}>+</button></li>
                        <li><button className="flex justify-center items-center text-white bg-blue-500 w-[30px] h-[30px]  hover:bg-blue-400" 
                        onClick={()=> decrementBasket(item)}>-</button></li>
                    </ul>
                ))}
            </div>

            <div className={`p-2 ${wishlistOpen ? "absolute w-1/3 bg-white h-screen top-0 right-0" : "hidden"}`}>
                <h1 className="text-5xl">Wishlist</h1>
                {wishlist && wishlist.map((item, index) => (
                    <ul className="flex flex-col gap-2" key={item.id}>
                        <li>{index + 1})</li>
                        <li>Name:{item.name}</li>
                        <li>Description:{item.description}</li>
                        <li><button className="bg-red-600 px-2 py-1 text-sm text-white"
                            onClick={() => addWishlist(item)}>Delete</button></li>
                    </ul>
                ))}
            </div>
        </div>

    )
}

export default Data
