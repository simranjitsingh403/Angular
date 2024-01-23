import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import Validation from 'src/app/utils/validation';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class AppSideRegisterComponent {
  constructor(private router: Router, private navService:NavService,private formBuilder: FormBuilder,private toastr: ToastrService) {}
 data:any;
 submitted = false;

  form: FormGroup = new FormGroup({
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
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }
  signUp()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    

    this.navService.post("Account",this.form.value).subscribe({
      next: value => console.log(value),
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () =>this.toastr.success("Record saved successfully.")
    });

  }

   
}
