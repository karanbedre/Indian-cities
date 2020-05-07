import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';


declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public baseUrl = environment.baseUrl;
  private geocoder: any;

  constructor(private http: HttpClient,
    private mapLoader: MapsAPILoader) { }


  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({ 'address': location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({ lat: 0, lng: 0 });
            } from
            observer.complete();
          });
        })
      })
    )
  }

  /* Set the headers for rest api call with content-type : json */
  getRequestHeaders() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  /* To handle the error response */
  handleError(error: any): Observable<any> {
    return throwError(error);
  }

  /* GET api call */
  get(api): Observable<any> {
    return this.http
      .get(this.baseUrl + api, { headers: this.getRequestHeaders(), observe: 'response' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
}
