import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId,
      }
    });
  }

  cancelOrder(order, orderId) {
    this.db.object('/orders/' + orderId).update({ orderStatus: 'Cancelled' });
  }
}
