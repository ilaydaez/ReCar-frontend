import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { RentItem } from '../models/rentItem';
import { RentItems } from '../models/rentItems';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  constructor() {}

  rentCar(car: Car) {
    let item = RentItems.find((r) => r.car.carID === car.carID);
    if (item) {
      item.quantity += 1;
    } else {
      let rentItem = new RentItem();
      rentItem.car = car;
      rentItem.quantity = 1;
      RentItems.push();
    }
  }

  removeFromRent(car:Car){
    let item:RentItem = RentItems.find((r) => r.car.carID === car.carID);
    RentItems.splice(RentItems.indexOf(item),1)
  }

  list(){
    return RentItems;
  }
}
