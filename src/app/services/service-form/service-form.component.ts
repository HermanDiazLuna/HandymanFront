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

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})

export class ServiceFormComponent implements OnInit {

  form: FormGroup;
  selectedCountryAdvanced: any;
  complete: boolean = false;
  selectedStatus: string[] = [];

  technicals: technicalModel[] = [];
  services: ServiceModel[] = [];
  filteredDataRaw!: any[];

  startDate!: Date;
  finishDate!: Date;
  minDateStartHour!: Date;
  maxDateFinish: Date = new Date();
  aux = 1;

  constructor(
    private formBuilder: FormBuilder,
    private readonly technicalService: ServiceTechnicalService,
    private readonly serrviceService: ServiceService,
    private readonly serviceRegisterService:ServiceRegisterService
  ) {
    this.form = this.formBuilder.group({
      documentNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
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
    if (this.form.invalid) {
      return
    } else {
      const statusServDetail = this.statusForm.value[0] == 'true' ? 1:0;
      const objServiceDetail :registerServiceModel = {
        idTechnicalServDetail: this.form.value.documentNumber.idTechnical,
        idServiceClientServDetail: this.form.value.serviceNumber.idService,
        startDateServDetail:moment(this.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDateServDetail:moment(this.finishDate).format("YYYY-MM-DD HH:mm:ss"),
        statusServDetail
      }
      Swal.fire({
        icon:'question',
        text:`Estas seguro(a) de crear el registro ?`,
        showConfirmButton:true,
        showCancelButton:true,
        confirmButtonText:'Guardar',
        cancelButtonText:'Cancelar'
      }).then(res=>{
        if(res.value){
          this.serviceRegisterService.saveRegisterService(objServiceDetail).subscribe((response:registerServiceModel)=>{
            Swal.fire({
              icon:"success",
              text:`El servicio ha sido registrado correctamente.`
            })
            this.form.reset();
            this.selectedStatus = [];
            this.getServices();
          },({error})=>{
            Swal.fire({
              icon:"error",
              text:error.msg
            })
          });
        }
      })
    }
  }
}
