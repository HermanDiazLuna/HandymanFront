import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceModel } from '../models/serviceModel';
const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  serviceData: ServiceModel[] = []

  constructor(private readonly http : HttpClient) { }

  getServices():Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>(`${base_url}/services/status/1`)
  }
}
