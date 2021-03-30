import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filters';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  currentColor : Color;
  colors : Color[] = [];
  colorFilter="";
  allColor ?:Color;
  Filters = {};

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  setCurrentColor(){
    this.currentColor != undefined
    ?(Filters.colorID = this.currentColor.colorID)
    :(Filters.colorID = null);
  }

  getCurrentClass(colorID: Color){

    if(this.currentColor === colorID){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  getAllColorClass(){

    if(!this.currentColor){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  allColorSelected(){
    return this.currentColor == undefined ? true : false;
  }
}
