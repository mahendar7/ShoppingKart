import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component } from '@angular/core';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  id;
  categories$;
  product = {
    title: '',
    price: 0,
    category: '',
    highlights: '',
    description: '',
    vidUrl: '',
    imgURL: ''
  };

  public images: any[] = [];

  test;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.gtAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getSigleProduct(this.id).take(1).subscribe(p => {
        this.product = p;
        this.images = p['images'] ? p['images'] : this.images;
      });
    }
  }

  save(product) {

    if (!this.id) {
      this.product['images'] = this.images;
    }

    if (this.id) this.productService.update(this.id, product, this.images);
    else this.productService.create(this.product);
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (confirm('Are you sure to delete ?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    }
  }

  addImage() {
    this.images.push({
      id: this.images.length + 1,
      imgURL: ''
    });
  }

  removeImage(i: number) {
    this.images.splice(i, 1);
  }

}
