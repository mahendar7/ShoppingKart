import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product.model';
import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('card-click') cardClick: boolean;

  constructor(private shoppingCartSevice: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartSevice.addToCart(this.product);
  }

}
