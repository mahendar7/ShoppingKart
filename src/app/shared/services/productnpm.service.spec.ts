import { TestBed, inject } from '@angular/core/testing';

import { ProductnpmService } from 'shared/services/productnpm.service';

describe('ProductnpmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductnpmService]
    });
  });

  it('should be created', inject([ProductnpmService], (service: ProductnpmService) => {
    expect(service).toBeTruthy();
  }));
});
