import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceForm2Component } from './service-form2.component';

describe('ServiceForm2Component', () => {
  let component: ServiceForm2Component;
  let fixture: ComponentFixture<ServiceForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceForm2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
