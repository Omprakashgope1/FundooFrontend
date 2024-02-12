import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HoverComponent } from '../hover/hover.component';
import { NOTE_ICON, REMINDER_ICON, EDIT_ICON, ARCHIVE_ICON, TRASH_ICON, SEARCH_ICON } from 'src/assets/icons';
// import { HIDE_PASS_ICON, SHOW_PASS_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host:{
    class : "app-login-cnt"
  }
  // encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  passType = "hide";
  loginValue : boolean = false;

  constructor(public formBuilder: FormBuilder, public router: Router,  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,public loginService : UserService
    ,private _snackBar: MatSnackBar) {
    // iconRegistry.addSvgIconLiteral('show-password-icon', sanitizer.bypassSecurityTrustHtml(SHOW_PASS_ICON));
    // iconRegistry.addSvgIconLiteral('hide-password-icon', sanitizer.bypassSecurityTrustHtml(HIDE_PASS_ICON));
  } 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

  // get userName() {
  //   return this.loginForm.get('userName');
  // }

  // get password() {
  //   return this.loginForm.get('password');
  // }

  togglePasswordVisibility(visibility = "hide") {  
    this.passType = visibility
  }

  async handleLogin() {
    this.submitted = true;
    const { userName, password } = this.loginForm.value
    console.log(this.f["userName"].errors?.['email']);
    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));

    if (this.loginForm.invalid) {
      return;
    }

    const res = await this.loginService.login({ "email": userName, "password": password })
    if(res?.success) {
      this.openFailedLoginMsg('Invalid Username / Password')
      this.router.navigate(['/dashboard/notes'])
      this.loginValue = true;
      localStorage.setItem('accessToken',res.data);
    }
    else
    {
      this.openSnackBar();
    }
    this.loginForm.reset();
    console.log(localStorage.getItem('accessToken'));

  }
  openFailedLoginMsg(message: string) {
      console.log(message);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(HoverComponent, {
      duration: 5 * 1000,
    })
  }
}
