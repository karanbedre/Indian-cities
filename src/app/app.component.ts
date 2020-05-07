import { Component, OnInit } from '@angular/core';
import { HttpService } from './http-service/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public http: HttpService) {

  }

  ngOnInit() {
  }

}
