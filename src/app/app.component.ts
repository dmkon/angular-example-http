import { Component, OnInit } from '@angular/core';
import { CarsService, ICar, ITitle } from './cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  colors = [
    'red',
    'blue',
    'green',
    'pink',
    'yellow',
    'grey'
  ];
  cars: ICar[] = [];
  carName: string = '';
  appTitle: string = '';

  constructor(private carsService: CarsService) {}

  ngOnInit() {
    this.carsService.getAppTitle()
      .subscribe((title:ITitle) => {
          this.appTitle = title.value
        }
      );
  }

  loadCars() {
    this.carsService.getCars()
      .subscribe((cars: ICar[]) => {
        console.log(cars);
        cars.forEach(item => console.log(item));
        this.cars = cars;
      });
  }

  addCar() {
    this.carsService
      .addCar(this.carName)
      .subscribe((car: ICar) => {
        this.cars.push(car);
      });
    this.carName = '';
  }

  getRandColor() {
    const num = Math.round(Math.random() * (this.colors.length - 1));
    return this.colors[num];
  }

  setNewColor(car: ICar) {
    this.carsService.changeColor(car, this.getRandColor())
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteCar(car: ICar) {
    this.carsService.deleteCar(car)
      .subscribe((data) => {
        this.cars = this.cars.filter(c => c.id !== car.id);
      });
  }
}

