import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { registerServiceModel } from 'src/app/shared/models/registerServiceModel';
import { ServiceModel } from 'src/app/shared/models/serviceModel';
import { technicalModel } from 'src/app/shared/models/technicalModel';
import { ServiceRegisterService } from 'src/app/shared/services/service-register.service';
import { ServiceTechnicalService } from 'src/app/shared/services/service-technical.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ErrorRequest } from 'src/app/shared/interfaces/ErrorRequest';
import { CalculatedService } from 'src/app/shared/services/calculated.service';
import { HoursWorked } from 'src/app/shared/models/hoursworked';
import { queryhours } from 'src/app/shared/models/queryHours';
import { JsonPipe } from '@angular/common';
import { Response } from 'src/app/shared/models/responde';


@Component({
  selector: 'app-service-form2',
  templateUrl: './service-form2.component.html',
  styleUrls: ['./service-form2.component.css']
})


export class ServiceForm2Component implements OnInit {
  

  form: FormGroup;
  selectedCountryAdvanced: any;
  complete: boolean = false;
  selectedStatus: string[] = [];

  technicals: technicalModel[] = [];
  services: ServiceModel[] = [];
  filteredDataRaw!: any[];
  filteredDataRawWeeks!: any[];
  weeks: HoursWorked[]=[];

  startDate!: Date;
  finishDate!: Date;
  minDateStartHour!: Date;
  maxDateFinish: Date = new Date();
  aux = 1;
  public result: Response = new Response();
  

  constructor(
    private formBuilder: FormBuilder,
    private readonly technicalService: ServiceTechnicalService,
    private readonly serrviceService: ServiceService,
    private readonly serviceRegisterService:ServiceRegisterService,
    private calculatedService:CalculatedService
  ) {
    this.form = this.formBuilder.group({
      documentNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      documentNumberWeek: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      serviceNumber: ['', [Validators.required, Validators.maxLength(5)]],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
    });
  }

  

  statusForm = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    let today: Date = new Date();
    let weekPermission = 1000 * 60 * 60 * 24 * 7;
    this.minDateStartHour = new Date(today.getTime() - weekPermission);

    this.technicals = this.technicalService.technical;
    this.getServices();
    this.getTechnicals();
    
    this.weeks = this.calculatedService.weeks;
    this.getWeeks();
  }

  getServices():void{
    this.serrviceService.getServices().subscribe((services:ServiceModel[])=>{
      this.services = services;
    },(error:ErrorRequest)=>{
      console.log(error)
      Swal.fire({
        icon:"error",
        text:"Ocurrio un error al cargar los servicios, intenta nuevamente."
      })
    })
  }

  getTechnicals():void{
    this.technicalService.getTechnicals().subscribe((technicals:technicalModel[])=>{
      this.technicals = technicals;
    },(error:ErrorRequest)=>{
      console.log(error)
      Swal.fire({
        icon:"error",
        text:"Ocurrio un error al cargar los tecnicos, intenta nuevamente."
      })
    })
  }

  getWeeks():void{
    this.calculatedService.getWeek().subscribe((w:HoursWorked[])=>{
      this.weeks = w;
    },(error:ErrorRequest)=>{
      console.log(error)
      Swal.fire({
        icon:"error",
        text:"Ocurrio un error al cargar las semanas, intenta nuevamente."
      })
    })
  }

  eventFilter(event: any, dataRaw: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < dataRaw.length; i++) {
      let raw = dataRaw[i];
      if (raw.toString().indexOf(query) == 0) {
        filtered.push(raw);
      }
    }
    this.filteredDataRaw = filtered;
  }

  filterDataRawDocument(event: any) {
    let dataRaw: any;
    dataRaw = this.technicals;
    this.eventFilter(event, dataRaw);
  }


  /* weeks */
  eventFilterWeeks(event: any, dataRaw: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < dataRaw.length; i++) {
      let raw = dataRaw[i];
      
      //filtered.push(raw);
      if (raw.toString().indexOf(query) == 0) {
        filtered.push(raw);
      }
    }
    this.filteredDataRawWeeks = filtered;
  }

  filterDataRawDocumentWeeks(event: any) {
    let dataRaw: any;
    dataRaw = this.weeks;
    this.eventFilterWeeks(event, dataRaw);
  }

  filterDataRawSerice(event: any) {
    let dataRaw: any
    dataRaw = this.services;
    this.eventFilter(event, dataRaw);
  }

  onChange() {
    let latestStatus = this.selectedStatus[this.selectedStatus.length - 1];
    this.selectedStatus.length = 0;
    this.selectedStatus.push(latestStatus);
  }

  get documentNumberForm(): any {
    return this.form.get('documentNumber');
  }

  get serviceNumberForm(): any {
    return this.form.get('serviceNumber');
  }

  get startDateForm(): any {
    this.compareDateValid();
    return this.form.get('startDate');
  }

  get finishDateForm(): any {
    this.compareDateValid();
    return this.form.get('finishDate');
  }

  compareDateValid():any {
    if (this.finishDate > this.startDate){
      return false
    }
    this.form.controls['finishDate'].setErrors({required:true})
    return true
  }

  onClickSave(): void {
    this.form.markAllAsTouched();
    this.statusForm.markAllAsTouched();

    const queryHoursWorked :queryhours = {
      idTechnicalServDetail: this.form.value.documentNumber.idTechnical,
      weekServDetail: this.form.value.documentNumberWeek,
    }
    
    const {idTechnicalServDetail,weekServDetail} = queryHoursWorked;

    console.log('id tecnico --> ',idTechnicalServDetail);
    console.log('semana --> ',weekServDetail);

    this.calculatedService.getHoursWorked(queryHoursWorked).subscribe({
      next: (response:any) => {
          const {normalHours, nightHours,sundayHours,extraNormalHours,extraNightHours,extraSundayHours} = response;
          this.result.normalHours=normalHours;
          this.result.nightHours=nightHours;
          this.result.sundayHours=sundayHours;
          this.result.extraNormalHours=extraNormalHours;
          this.result.extraNightHours=extraNightHours;
          this.result.extraSundayHours=extraSundayHours;
          
          console.log('response --> ',response);
          Swal.fire('Calculadora de Horas',
            `<strong>Horas Normales: </strong> ${normalHours} <br> 
            <strong>Horas Nocturnas: </strong>${nightHours} <br>
            <strong>Horas Dominicales : </strong> ${sundayHours} <br> 
            <strong>Horas Extras Normales : </strong> ${extraNormalHours} <br> 
            <strong>Horas Extras Nocturnas : </strong> ${extraNightHours} <br> 
            <strong>Horas Extras Dominicales : </strong> ${extraSundayHours} <br> `,'success');
      },
      error: (err) => {
        console.log(err);
        
        /* capturamos el error */
        
      }
    })


  }

 
 
  
  


}
