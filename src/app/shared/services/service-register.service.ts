import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerServiceModel } from '../models/registerServiceModel';
const base_url = environment.url_api;
@Injectable({
  providedIn: 'root'
})
export class ServiceRegisterService {


  constructor(private readonly http: HttpClient) { }

  getRegisterServices() {
    return this.http.get<registerServiceModel[]>(environment.url_api + '/datas')
  }

  saveRegisterService(registerService:registerServiceModel):Observable<registerServiceModel>{
    return this.http.post<registerServiceModel>(`${base_url}/servicesdetail`, registerService);
  }
}
