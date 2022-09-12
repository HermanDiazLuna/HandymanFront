import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMainComponent } from './service-main.component';

describe('ServiceMainComponent', () => {
  let component: ServiceMainComponent;
  let fixture: ComponentFixture<ServiceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
