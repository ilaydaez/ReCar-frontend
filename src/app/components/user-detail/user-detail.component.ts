import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  reloaded = false;
  updateUserForm: FormGroup;
  user: User[];
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reload();
    this.createUserForm();
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService
      .getUserByMail(this.localStorageService.get('email'))
      .subscribe((response) => {
        this.user = response.data;
        response.data.forEach((data) => {
          this.localStorageService.add('userFirstName', data.userFirstName);
          this.localStorageService.add('userLastName', data.userLastName);
          this.localStorageService.add('email', data.email);
          this.localStorageService.add('passwordHash', data.passwordHash);
          this.localStorageService.add('passwordSalt', data.passwordSalt);
          this.localStorageService.add('id', data.id);
          this.localStorageService.add('userFindexScore', data.userFindexScore);
        });
      });
  }

  createUserForm() {
    this.updateUserForm = this.formBuilder.group({
      id: [
        this.localStorageService.get('id'),
        Validators.nullValidator,
      ],
      userFirstName: [
        this.localStorageService.get('userFirstName'),
        Validators.nullValidator,
      ],
      userLastName: [
        this.localStorageService.get('userLastName'),
        Validators.nullValidator,
      ],
      email: [
        this.localStorageService.get('email'), 
        Validators.email
      ],
      passwordHash: [
        this.localStorageService.get('passwordHash'),
        Validators.nullValidator,
      ],
      passwordSalt: [
        this.localStorageService.get('passwordSalt'),
        Validators.nullValidator,
      ],
      status: [true, Validators.nullValidator],
      userFindexScore: [
        this.localStorageService.get('userFindexScore'),
        Validators.nullValidator,
      ],
    });
  }

  update() {
    if (this.updateUserForm.valid) {
      let userModel = Object.assign({}, this.updateUserForm.value);
      userModel.id = Number(userModel.id);
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.info(response.message, 'Başarılı');
        setTimeout(function () {
          location.reload();
        }, 600);
        setTimeout(function () {
          location.reload();
        });
      });
    } else {
      this.toastrService.error('Tüm Alanları Doldurunuz', 'Dikkat');
    }
  }

  reload() {
    if (this.reloaded) {
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      setTimeout(function () {
        location.reload();
      });
      this.reloaded = true;
    }
  }

}
