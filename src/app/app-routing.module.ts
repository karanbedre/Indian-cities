import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityViewComponent } from './city-view/city-view.component';


const routes: Routes = [
  { path: '', redirectTo: 'city', pathMatch: 'full' },
  { path: 'city', component: CityViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
