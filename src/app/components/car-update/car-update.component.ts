import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  carDetail: CarDetail;

  brands: Brand[];
  colors: Color[];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carID']) {
        this.getCarDetailsByCarId(params['carID']);
      }
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      brandID: ['', [Validators.required]],
      colorID: ['', [Validators.required]],
      modelYear: [0, [Validators.required]],
      dailyPrice: [0, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.carDetail.carID;
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.success(responseError.message);
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }

  getCarDetailsByCarId(carID: number) {
    this.carService.getCarsById(carID).subscribe((response) => {
      this.carDetail = response.data[0];
      this.carUpdateForm.setValue({
        brandName: this.carDetail.brandName,
        brandID: this.carDetail.brandID,
        colorID: this.carDetail.colorID,
        modelYear: this.carDetail.modelYear,
        dailyPrice: this.carDetail.dailyPrice,
        description: this.carDetail.description,
      });
    });
  }   
}

