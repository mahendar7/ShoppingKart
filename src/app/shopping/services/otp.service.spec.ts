import { TestBed, inject } from '@angular/core/testing';

import { OtpService } from './otp.service';

describe('OtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtpService]
    });
  });

  it('should be created', inject([OtpService], (service: OtpService) => {
    expect(service).toBeTruthy();
  }));
});
