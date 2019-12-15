import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

  export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
    ) { }

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.loginForm.controls);
      this.authService.login(this.f.username.value , this.f.password.value)
      .subscribe((resp) => {
        if(resp['success']){
          this.authService.storUserSession(resp['data']);
          this.router.navigate(['/dashboard']);
        }
        this.submitted = false;
        this.loading = false;
        console.log(resp);
      },(error)=>{
        this.submitted = false;
        this.loading = false;
        console.log(error);
      });
    }
  }