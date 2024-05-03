import { createContext, ReactNode, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
}

interface Basket {
    id: number;
    name: string;
    description: string;
    count: number;
}

interface BasketContextType {
    basket: Basket[];
    setBasket: React.Dispatch<React.SetStateAction<Basket[]>>;
    addBasket: (product: Product) => void;
    deleteBasket: (product: Product) => void;
    incrementBasket: (product: Product) => void;
    decrementBasket: (product: Product) => void;
}

export const BasketContext = createContext<BasketContextType>({
    basket: [],
    setBasket: () => { },
    addBasket: () => { },
    deleteBasket: () => { },
    incrementBasket: () => { },
    decrementBasket: () => { }
});

const BasketProvider = ({ children }: { children: ReactNode }) => {
    const [basket, setBasket] = useState<Basket[]>([]);

    const addBasket = (product: Product) => {
        try {
            const findBasket = basket.find((x) => x.id === product.id);
            if (!findBasket) {
                setBasket([...basket, { ...product, count: 1 }]);
            } else {
                findBasket.count++;
                setBasket([...basket]);
            }
            console.log("salam");

        } catch (error) {
            console.log(error);
            console.log("Yooox");

        }
    };

    const deleteBasket = (product: Product) => {
        setBasket(basket.filter((x) => x.id !== product.id));
    };

    const incrementBasket = (product: Product) => {
        const findBasket = basket.find((x) => x.id === product.id)
        if (findBasket) {
            findBasket.count++
            setBasket([...basket])
        }
    }

    const decrementBasket = (product: Product) => {
        const findBasket = basket.find((x) => x.id === product.id)
        if (findBasket) {
            findBasket.count--
            setBasket([...basket])
            if (findBasket?.count <= 0) {
                setBasket(basket.filter(x => x.id !== product.id))
            }
        }
    }

    const data: BasketContextType = {
        basket,
        setBasket,
        addBasket,
        deleteBasket,
        incrementBasket,
        decrementBasket
    };

    return (
        <BasketContext.Provider value={data}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketProvider;
