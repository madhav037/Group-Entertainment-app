import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  show = false;

  signInData = new FormGroup(
    {
      email : new FormControl(''),
      password : new FormControl(''),
      showPassword : new FormControl(false)
    }
  )

  onSubmit(){
    console.log(this.signInData.value);
  }

  password(){
    this.show = !this.show;
  }

  constructor(private userData:SigninService) {  }

  postUserData(data:any) 
  {
    this.userData.postUser(data).subscribe((temp) => {
      console.log(temp);
      
    })
    
  }
}
