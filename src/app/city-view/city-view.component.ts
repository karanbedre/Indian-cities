import { Component, OnInit } from '@angular/core';
import { CityViewServiceService } from '../city-view-service/city-view-service.service';
import { HttpService } from '../http-service/http-service.service';


@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})

export class CityViewComponent implements OnInit {
  public stateList = [];
  public cityList = [];
  public markers = [];
  public selectedState: string = '';
  public noCityMsg: boolean = false;
  public zoom: number = 6;
  public lat: number = 20.5937;
  public lng: number = 78.9629;
  constructor(private http: CityViewServiceService, private https: HttpService) { }

  ngOnInit() {
    this.getState();
  }

  getState() {
    this.http.get('cities').subscribe(res => {
      let array = [];
      res.filter(ele => array.push(ele.State));
      array = [...new Set(array)];
      this.stateList = array.sort();
    }, err => {
      console.log(err);
    });
  }

  fetchCities(event: any) {
    this.selectedState = event.target.value;
    this.http.get(`cities?State=${event.target.value}`).subscribe(res => {
      this.cityList = res;
      if (this.cityList.length > 0) {
        this.getCityLocation();
        this.noCityMsg = false;
      } else {
        this.noCityMsg = true;
      }
    }, err => {
      console.log(err);
    })
  }

  getCityLocation() {
    this.markers = [];
    this.cityList.forEach(ele => {
      this.https.geocodeAddress(ele.City)
        .subscribe((location) => {
          this.markers.push(location)
        }, err => {
          console.log(err);
        });
    })
  }
}

