import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { technicalModel } from '../models/technicalModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceTechnicalService {

 technical:technicalModel[] = []

  constructor(private readonly http : HttpClient) { }

  getTechnicals():Observable<technicalModel[]>{
    return this.http.get<technicalModel[]>( environment.url_api+'/technicals')
  }
}
