import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl = "http://localhost:3000/api/auth/signup";

  constructor(private _http:HttpClient) { }

  postUser(data:any){
    return this._http.post(this.apiUrl, data)
  }
}
