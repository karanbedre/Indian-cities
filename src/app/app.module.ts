import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CityViewComponent } from './city-view/city-view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CityViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZWJnxZ4fWLu0Lid7AC5Y9T0dnGuBZzxs'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
