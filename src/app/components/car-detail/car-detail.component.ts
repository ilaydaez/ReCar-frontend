
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { RentService } from 'src/app/services/rent.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  carImageBasePath = 'https://localhost:44350/images/';

  customers: Customer[] = [];
  customerID: number;
  customerName: string;
  companyName: string;
  customerEmail: string;
  rentDate!: Date;
  returnDate!: Date;
  carDailyPrice: number;
  amountPaye: number = 0;

  carID: number;
  carBrandName: string;
  carModelYear: number;

  constructor(
    private carService: CarService,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private paymentServise: PaymentServiceService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carID']) {
        this.getCarDetailByCarId(param['carID']);
        this.getCustomersDetails();
        this.getCarImagesByCarId(param['carID']);
      }

    });
  }



  getCarDetailByCarId(carID: number) {
    this.carDetailService.getCarDetailByCarId(carID).subscribe((response) => {
      this.carDetail = response.data[0];
      console.log(this.carDetail);
    });
  }

  // getCarImage(carDetail:Car){

  //   if(carDetail.imagePath){
  //     return carDetail.imagePath
  //   }
  //   else{
  //     return 'default.jpg'
  //   }
  // }

  getCarImagesByCarId(carID: number) {
    this.carImageService.getCarImageByCarId(carID).subscribe((response) => {
      this.carImages = response.data;

      this.carImageBasePath =
        this.carImageBasePath + '' + this.carImages[0].imagePath;
    });
  }

  sliderItemActive(index: number) {
    if (index === 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  setParentImage(carImage: CarImage) {
    this.carImageBasePath = this.carImageBasePath + '' + carImage.imagePath;
  }

  chooseOtherPhotoByImageUrl(carImageBasePath: string) {
    var sortedImages = this.carImages.sort((p) => p.imageID);
    for (let i = 0; i < sortedImages.length; i++) {
      const element = this.carImageBasePath + '' + sortedImages[i].imagePath;
      if (carImageBasePath == element) {
        if (i == this.carImages.length - 1) {
          i = 0;
        } else {
          i++;
        }
        this.setParentImage(sortedImages[i]);
        break;
      }
    }
  }

  getCustomersDetails() {
    this.customerService.getCustomersDetails().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createRentalRequest(carDetail: CarDetail) {
    if (this.customers === undefined) {
      this.toastrService.warning('Müşteri bilgisini kontrol ediniz.');
    } else if (this.rentDate === undefined || !this.rentDate) {
      this.toastrService.warning('Alış Tarihi bilgisini kontrol ediniz.');
    } else if (this.returnDate === undefined || !this.returnDate) {
      this.toastrService.warning('Teslim Tarihi bilgisini kontrol ediniz.');
    } else if (this.returnDate < this.rentDate) {
      this.toastrService.error(
        'Teslim Tarihi, Kiralama Tarihinde önce seçilemez.'
      );
    } else if (this.returnDate == this.rentDate) {
      this.toastrService.error('Kiralama Tarihi ve Teslim Tarihi aynı olamaz.');
    } else {
      this.toastrService.info('Bilgileriniz kontrol ediliyor.');

      this.carID = carDetail.carID;
      this.carBrandName = carDetail.brandName;
      this.carModelYear = carDetail.modelYear;
      this.carDailyPrice = carDetail.dailyPrice;

      let carToBeRented: Rental = {
        carID: this.carID,
        customerID: this.customerID,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };

      this.rentalService.checkCarStatus(carToBeRented).subscribe(
        (response) => {
          this.toastrService.success(response.message.toString(),'Tarihler Uygun');

          var date1 = new Date(this.returnDate.toString());
          var date2 = new Date(this.rentDate.toString());
          var difference = date1.getTime() - date2.getTime();
          var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
          this.amountPaye = numberOfDays * this.carDailyPrice;

          if (this.amountPaye <= 0) {
            this.router.navigate(['/carDetail/' + this.carID]);
            this.toastrService.error('Araç listesine yönlendiriliyorsunuz','Hatalı işlem');
          } 
          else {
            this.paymentServise.setRental(carToBeRented, this.amountPaye);

            setTimeout(() => {
              this.toastrService.success('Bilgileriniz onaylandı.');
            }, 1000);

            setTimeout(() => {
              this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...','Ödeme İşlemleri');
            }, 1000);

            setTimeout(() => {
              this.router.navigate(['/payments']);
            }, 3000);
          }
        },
        (error) => {
          this.toastrService.error('The car cannot be rented on the requested dates.','Kiralama Başarısız');
        }
      );
    }
  }

  
}
