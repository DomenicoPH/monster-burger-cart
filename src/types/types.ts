export type Burger = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type CartItem = Burger & {
    quantity: number;
}