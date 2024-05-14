import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl = 'http://localhost:3000/api/user/uploadProfilePicture';
  userUrl = 'http://localhost:3000/api/user/getCurrentUser';
  allUserUrl = 'http://localhost:3000/api/user/all';
  constructor(private _httpUrl:HttpClient, ) { }

  postImage(data:any) {
    return this._httpUrl.put(this.apiUrl, data);
  }

  getUserData() {
    return this._httpUrl.get(this.userUrl);
  }

  getAllUserData() {
    return this._httpUrl.get(this.allUserUrl);
  }
}