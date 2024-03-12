import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import Validation from '../../../../utils/validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private navService: ApiService, private formBuilder: FormBuilder) { }

  data: any;
  submitted = false;

  form = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    debugger;
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }
  signUp() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }


    this.navService.post("Account/Register", this.form.value).subscribe({
      next: value => console.log(value),
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log("success")
    });

  }

}
