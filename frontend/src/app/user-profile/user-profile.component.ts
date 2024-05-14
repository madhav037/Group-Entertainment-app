import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

    name!:string;
    email!:string;
    createdAt!:string;
    image!:string;

  selectedFile:any;
  constructor(private router:Router, private serverData:UserProfileService){
  }

  openFileUploader() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    // this.selectedFile = file.name;
    console.log('Selected file:', file);

    this.serverData.postImage(this.selectedFile).subscribe(temp => {
      console.log(temp);
    })
  }

  ngOnInit(): void {
    this.serverData.getUserData().subscribe((userData : any) => {
      if(userData && userData.user && userData.user.user_metadata)
        {
          this.name = userData.user.user_metadata.name;
          this.email = userData.user.user_metadata.email;
          this.createdAt = userData.user.created_at;
        }
    });
  }

  signOut() {

  }
}
