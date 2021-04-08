import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createPasswordForm();
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      id: [
        this.localStorageService.get('id'),
        Validators.nullValidator,
      ],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  change() {
    if (this.passwordForm.valid) {
      let userModel = Object.assign({}, this.passwordForm.value);
      userModel.id = Number(userModel.id);
      this.authService.changePassword(userModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          console.log(responseError.error.message);
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.error(
        'Tüm Alanları Doldurduğunuzdan Emin Olunuz',
        'Dikkat'
      );
    }
  }
}
