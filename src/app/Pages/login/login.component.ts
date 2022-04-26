import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginDTO } from 'src/app/DTOs/LoginDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroupTyped<LoginDTO>;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    }) as FormGroupTyped<LoginDTO>;
  }
}
