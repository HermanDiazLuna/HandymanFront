import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-main',
  templateUrl: './service-main.component.html',
  styleUrls: ['./service-main.component.css']
})
export class ServiceMainComponent implements OnInit {

  tabSelected: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
