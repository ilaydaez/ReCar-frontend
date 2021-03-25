import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilterPipe'
})
export class ColorFilterPipePipe implements PipeTransform {

  transform(value: Color[], colorFilter:string): Color[] {
    colorFilter = colorFilter?colorFilter.toLocaleLowerCase():""
    return colorFilter?value.filter((p:Color)=>p.colorName.toLocaleLowerCase().indexOf(colorFilter)!==-1):value;
  }

}
