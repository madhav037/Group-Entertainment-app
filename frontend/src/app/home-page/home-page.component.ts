import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  name!:String;
  userList!:Array<any>;
  constructor(private userData: UserProfileService){}

  count = 0;
  
  ngOnInit(): void {
      this.userData.getUserData().subscribe((userData : any) => {
        if(userData && userData.user && userData.user.user_metadata)
          {
            this.name = userData.user.user_metadata.name;
          }
        }
      )

      this.userData.getAllUserData().subscribe(( temp : any ) => {        
       this.userList = temp;
      })
  }

  onFriendUser() {
    this.count = 0;
  }

  onChat() {
    this.count = 1;
  }

  onVideo() {
    this.count = 2;
  }

  onGame() {
    this.count = 3;
  }

  onAllUser() {
    this.count = 4;
  }
}
