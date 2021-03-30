import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  currentBrand : Brand;
  brands: Brand[] = [];
  filterBrand = "";
  allBrand ?:Brand;
  Filters = {};


  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response.data;
      });
  }

  setCurrentBrand(){
    this.currentBrand != undefined
    ?(Filters.brandID = this.currentBrand.brandID)
    :(Filters.brandID = null);
  }

  getCurrentBrand(brandID: Brand){

    if(this.currentBrand === brandID){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllBrandsClass(){

    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    
    }
  }

  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  }
}
