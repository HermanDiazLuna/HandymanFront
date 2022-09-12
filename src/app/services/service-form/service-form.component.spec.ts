import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ServiceRegisterService } from 'src/app/shared/services/service-register.service';
import { ServiceTechnicalService } from 'src/app/shared/services/service-technical.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceFormComponent } from './service-form.component';

describe("ServiceFormComponent",()=>{
  let component:ServiceFormComponent;
  let fixure:ComponentFixture<ServiceFormComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[ServiceFormComponent],
      providers:[FormBuilder,ServiceTechnicalService,ServiceService,ServiceRegisterService],
      imports:[HttpClientTestingModule]
    });

    fixure = TestBed.createComponent(ServiceFormComponent)
    component = fixure.componentInstance;
  })

  it('Debe de crearse el componente ServiceForm',()=>{
    expect(component).toBeTruthy();
  })

})
