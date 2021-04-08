import { Component, OnInit } from '@angular/core';
import { Findex } from 'src/app/models/findex';
import { AuthService } from 'src/app/services/auth.service';
import { FindexService } from 'src/app/services/findex.service';

@Component({
  selector: 'app-findex',
  templateUrl: './findex.component.html',
  styleUrls: ['./findex.component.css']
})
export class FindexComponent implements OnInit {
  findex: Findex[] = [];
  constructor(
    private authService: AuthService,
    private findexService: FindexService,
  ) {}

  ngOnInit(): void {
    this.findexByUserId(this.authService.id)
  }
  findexByUserId(id: number) {
    this.findexService.getFindexScoreByUserId(id).subscribe((response) => {
      this.findex = response.data;
    });
  }

}
