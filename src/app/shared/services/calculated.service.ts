import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HoursWorked } from '../models/hoursworked';
import { queryhours } from '../models/queryHours';

const base_url = environment.url_api;
@Injectable({
  providedIn: 'root'
})
export class CalculatedService {

  weeks:HoursWorked[] = []
  
  constructor(private http: HttpClient) { }
  
  getWeek():Observable<HoursWorked[]>{
    return this.http.get<HoursWorked[]>(`${base_url}/servicesdetail/weeks`);
  }

  getHoursWorked(queryHours:queryhours):Observable<queryhours[]>{
    const {idTechnicalServDetail,weekServDetail} = queryHours;
      return this.http.get<queryhours[]>(`${base_url}/servicesdetail/${idTechnicalServDetail}/${weekServDetail}`);
  }

}
