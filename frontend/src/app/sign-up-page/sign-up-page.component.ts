import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

  show = false;

  signUpData = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    showPassword : new FormControl(false)
  })

  onSubmit()
  {
    console.log(this.signUpData.value);
  }

  password()
  {
    this.show = !this.show;
  }

  constructor(private userData:SignupService){  }

  postUserData(data:any){
    console.log(data.value);
    this.userData.postUser(data).subscribe((temp) => {
      console.log(temp);
    })
    
  }
}
