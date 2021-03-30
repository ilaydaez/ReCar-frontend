import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  setRoute() {
    if (Filters['brandID'] && Filters['colorID']){
      this.router.navigate([
        `cars/brand/${Filters.brandID}/color/${Filters.colorID}`,
      ]);
      console.log("siledar brand color:"+Filters.brandID+"-"+Filters.colorID);
    }
    else if (Filters['brandID']){
      this.router.navigate([`cars/brand/${Filters.brandID}`]);
      console.log("siledar brand:"+Filters.brandID);
    }
    else if (Filters['colorID']){
      this.router.navigate([`cars/color/${Filters.colorID}`]);
      console.log("siledar color:"+Filters.colorID);
    }
    else{
      this.router.navigate([`cars/`]);
      console.log("siledar setRoute boş");
    } 
  }

  clearRoute() {
    this.router.navigate([`cars/`]);  
    console.log("siledar clearRoute");
  }

}
