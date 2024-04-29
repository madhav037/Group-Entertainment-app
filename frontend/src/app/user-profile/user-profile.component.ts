import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  selectedFile:any;
  constructor(private router:Router, private imageData:UserProfileService){}

  data: string | null = localStorage.getItem('userInfo');
  userData: {name : String, id : Number, created_at : any, email : String, profile_picture : String, friends : any} | null = this.data ? JSON.parse(this.data) : null;

  signOut() {
    localStorage.removeItem('userInfo');

    this.router.navigate(['/']);
  }

  openFileUploader() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file.name;
    console.log('Selected file:', file);

    // this.imageData.postImage(this.selectedFile).subscribe(temp => {
    //   console.log(temp);
    // })
  }

}
