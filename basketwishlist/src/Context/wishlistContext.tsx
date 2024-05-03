import { ReactNode, createContext, useState } from "react"

interface Product {
    id: number;
    name: string;
    description: string;
}

interface WishlistContextType {
    wishlist: Product[]
    setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
    addWishlist: (product: Product) => void;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    setWishlist: () => { },
    addWishlist: () => { },
})

const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([])

    const addWishlist = (product: Product) => {
        const findWishlist = wishlist.find((x) => x.id === product.id)

        if (!findWishlist) {
            setWishlist([...wishlist, product])
        } else {
            setWishlist(wishlist.filter(x => x.id !== product.id))
        }
    }

    const data = { wishlist, setWishlist, addWishlist }
    return (
        <WishlistContext.Provider value={data}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider