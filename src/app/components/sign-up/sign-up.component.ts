import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',  
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  signUpForm!:FormGroup;
  submitted:boolean = false;

  constructor(public formBuilder: FormBuilder,public signUpService : UserService,public router : Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        userName: ['',[Validators.required,Validators.minLength(6)]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirm:['',[Validators.required,Validators.minLength(6)]]
      }
    );
  }
  get f(){return this.signUpForm.controls};
  async handleSignUp() {
    this.submitted = true;
    const { firstName,lastName,userName,password,confirm } = this.signUpForm.value;
    console.log(firstName);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpForm.value, null, 4));

    if (this.signUpForm.invalid) {
      return;
    }
    const res = await this.signUpService.signup({firstName :firstName,lastName:lastName,dateOfBirth:"2024-01-12T12:01:19.482Z",email:userName,password:password});
    if(res?.success) {
      this.router.navigate(['/login'])
    }
  }

}