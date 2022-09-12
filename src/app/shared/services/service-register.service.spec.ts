import { TestBed } from '@angular/core/testing';
import { ServiceRegisterService } from './service-register.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceRegisterService', () => {
  let service: ServiceRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ServiceRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
