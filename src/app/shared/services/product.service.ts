import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getSigleProduct(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product, images) {
    this.db.object('/products/' + productId).update(product);
    return this.db.object('/products/' + productId + '/images/').set(images);

  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }

}
