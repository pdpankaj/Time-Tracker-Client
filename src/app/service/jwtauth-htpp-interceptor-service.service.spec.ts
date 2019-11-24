import { TestBed } from '@angular/core/testing';

import { JWTAuthHtppInterceptorServiceService } from './jwtauth-htpp-interceptor-service.service';

describe('JWTAuthHtppInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTAuthHtppInterceptorServiceService = TestBed.get(JWTAuthHtppInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
