import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$

  @Input('category') category;


  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.gtAll();
  }


}
