import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], carFilter:string): Car[] {
    carFilter = carFilter?carFilter.toLocaleLowerCase():""
    return carFilter?value.filter((p:Car)=>p.carName.toLocaleLowerCase().indexOf(carFilter)!==-1):value;
  }

}
