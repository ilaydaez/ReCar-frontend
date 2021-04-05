import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["", Validators.required]
      
    });

  }
  add(){
    if (this.colorAddForm.valid) {
      let brandModel = Object.assign({},this.colorAddForm.value) 
      this.colorService.add(brandModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message)
      }, responseError=>{
        console.log(responseError.error);
        this.toastrService.error(responseError.error)
      })
      
      
    }else{
      this.toastrService.error("Formunuz Eksik", "Dikkat!")
    }
 
  }

}
