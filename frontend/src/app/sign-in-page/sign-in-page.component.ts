import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SigninService } from '../signin.service';
import { Router } from '@angular/router';
import { getUserInfo, setUserInfo } from '../global';
import { Store, select } from '@ngrx/store';
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

  constructor(private userData:SigninService, private router : Router, private store:Store) {  }

  

  postUserData(data:any) 
  {
    this.userData.postUser(data.value).subscribe((temp) => {
      
      if (temp.status === 200) {
        this.router.navigateByUrl('/home');
      }
      else
      {
        window.alert('invalid details...');
      }
    })
    
  }

  checkRes(){
    this.postUserData(this.signInData);
  }
}
