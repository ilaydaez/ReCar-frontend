import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}
  Authenticated: boolean;
  ngOnInit(): void {
    this.isAuthenticated();
    this.getByUserId();
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.Authenticated = true;
    } else {
      this.Authenticated = false;
    }
  }

  getByUserId() {
    this.userService
      .getUserByUserId(Number(this.localStorageService.get('id')))
      .subscribe((response) => {
        this.user = response.data;
      });
  }

  logOut() {
    this.localStorageService.clear();
    this.toastrService.info('Çıkış Yapıldı', 'Bilgi');
    setTimeout(function () {
      location.reload();
    }, 400);
  }

}
