import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceFormComponent } from './services/service-form/service-form.component';
import { ServiceListComponent } from './services/service-list/service-list.component';


const routes: Routes = [
  // {path:home ,component:},
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'list', component: ServiceListComponent },
  { path: 'form', component: ServiceFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
