import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityViewServiceService {

  constructor(private httpService: HttpService) { }

  get(url: any): Observable<any> {
    return this.httpService.get(url)
      .pipe(
        map((res: Response) => {
          return res.body;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
