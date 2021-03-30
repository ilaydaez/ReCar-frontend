import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: Car;
  carImages: CarImage[] = [];
  carImageBasePath = 'https://localhost:44350/images/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carID']) {
        this.getCarDetailByCarId(param['carID']);
      }

      this.getCarImageByCarId();
    });
  }

  getCarDetailByCarId(carID: number) {
    this.carDetailService.getCarDetailByCarId(carID).subscribe((response) => {
      this.carDetail = response.data[0];
      console.log(this.carDetail);
    });
  }

  getCarImageByCarId() {
    this.carImageService
      .getCarImageByCarId(this.activatedRoute.snapshot.params['carID'])
      .subscribe((response) => {
        this.carImages = response.data;
        console.log(this.carImages);
      });
  }

  sliderItemActive(index: number) {
    if (index === 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  
}
