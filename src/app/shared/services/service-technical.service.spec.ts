import { TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { technicalModel } from '../models/technicalModel';
import { ServiceTechnicalService } from './service-technical.service';

describe('ServiceTechnicalService', () => {
  let httpClientSpy:{ get:jasmine.Spy }
  let service:ServiceTechnicalService;
  const expectedtechnicals = [
    {
      "idTechnical": "1152669883",
      "nameTechnical": "Jaime Alejandro Gomez Solarte",
      "typeDocumentTechnical": "CC"
    },
    {
      "idTechnical": "16466873",
      "nameTechnical": "Raquel Sofía Neira Chaparro",
      "typeDocumentTechnical": "CC"
    },
    {
      "idTechnical": "78956453",
      "nameTechnical": "Sammy Steven Muñoz Hidalgo",
      "typeDocumentTechnical": "CC"
    },
    {
      "idTechnical": "9999999999",
      "nameTechnical": "Sebastián David Carvajal Rosero",
      "typeDocumentTechnical": "CC"
    },
    {
      "idTechnical": "E153354A",
      "nameTechnical": "Carlos Lugo",
      "typeDocumentTechnical": "CE"
    }
  ]

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ServiceTechnicalService(httpClientSpy as any);
  });

  it('Deberia devolver los tecnicos', () => {
    const spy = spyOn(service, 'getTechnicals').and.callFake(() => {
      return from([expectedtechnicals]);
    })
    console.log(spy)
    expect(spy).toHaveBeenCalled();
  });
});
