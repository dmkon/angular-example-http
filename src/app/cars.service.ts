import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export interface ITitle {
  value: string;
}

export interface ICar {
  id: number;
  name: string;
  color: string;
}

@Injectable()
export class CarsService {
  constructor(private httpClient: HttpClient) {}

  getAppTitle(): Observable<ITitle> {
    return this.httpClient.get<ITitle>('http://localhost:3000/title')
      .delay(3000)

    //Angular ver.4
    // return this.httpClient.get('http://localhost:3000/title')
    //   .delay(3000)
    //   .map((response: Response) => response.json())
    //   .map((data) => data);
  }

  getCars(): Observable<ICar[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    });
    return this.httpClient
      .get<ICar[]>('http://localhost:3000/cars', {
        headers: headers
      })
      .catch((error: HttpResponse<ICar>) => {
        return Observable.throw('Server unavailable. Try again later.');
      });

    //Angular ver.4
    // return this.http
    //   .get('http://localhost:3000/cars', {
    //     headers: headers
    //   })
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => {
    //     return Observable.throw('Server unavailable. Try again later.');
    //   });
  }

  addCar(carName: string) {
    const data = {
      name: carName,
      color: 'blue'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    });
    return this.httpClient.post('http://localhost:3000/cars', data, {
      headers
    });

    //Angular ver.4
    // return this.httpClient.post('http://localhost:3000/cars', data, {
    //   headers
    // })
    //   .map((response: Response) => response.json());
  }

  changeColor(car: any, color: string) {
    car.color = color;
    return this.httpClient.put(`http://localhost:3000/cars/${car.id}`, car);

    //Angular ver.4
    // return this.httpClient.put(`http://localhost:3000/cars/${car.id}`, car)
    //   .map((response: Response) => response.json());
  }

  deleteCar(car: any) {
    return this.httpClient.delete(`http://localhost:3000/cars/${car.id}`);

    //Angular ver.4
    // return this.httpClient.delete(`http://localhost:3000/cars/${car.id}`)
    //   .map((response: Response) => response.json());
  }
}
