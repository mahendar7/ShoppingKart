import { ShoppingCart } from './shopping-cart';

export class Order {
    date: number;
    items: any[];
    orderTotal: number;
    orderStatus: string;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.date = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imgURL,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });

        this.orderTotal = this.totalPrice;
        this.orderStatus = 'Arrving Soon'
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        };
        return sum;
    }
}