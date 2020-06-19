import { Product } from './../shared/models/product.model';
import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { ProductService } from './../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product[] = [];
  images = {};
  singleProduct: any;

  id;
  img: string;
  video: any;

  cart$

  highlights;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getSigleProduct(this.id).take(1).subscribe(p => {
        this.product = p;
        this.highlights = this.product['highlights'].split(',')
      });
    }
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.productService.getSigleProduct(this.id).subscribe(response => {
      this.singleProduct = response;
      this.images = response['images']
    })
  }

  changeImage(imageLink) {
    this.img = imageLink.src;
    this.video = ''
  }

  changeVideo(videoLink) {
    this.video = videoLink.src;
    this.img = ''
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.singleProduct);
  }



}
