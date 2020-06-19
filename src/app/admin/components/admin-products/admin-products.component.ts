import { Product } from 'shared/models/product.model';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products$: Product[];
  items: Product[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products$ = products;
      this.IntializeTable(products);
    });
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private IntializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }

  delete(productId) {
    this.productService.delete(productId);
  }

  filter(query) {
    let filteredProducts = (query) ?
      this.products$.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products$;

    this.IntializeTable(filteredProducts);
  }

}
