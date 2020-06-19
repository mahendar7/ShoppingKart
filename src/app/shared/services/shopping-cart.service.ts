import { Observable } from 'rxjs/Observable';
import { ShoppingCartComponent } from '../../shopping/components/shopping-cart/shopping-cart.component';
import { Product } from 'shared/models/product.model';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { ShoppingCart } from 'shared/models/shopping-cart';

import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    } else {
      let result = this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  private create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.$key)
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;

      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imgURL: product.imgURL,
        price: product.price,
        quantity: quantity
      });
    });
  }

}
