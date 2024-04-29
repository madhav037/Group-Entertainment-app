import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  apiUrl = 'http://localhost:3000/api/auth/signin';

  constructor(private _http:HttpClient) { }

  postUser(data:any)
  {
    return this._http.put(this.apiUrl, data, {observe : 'response'});
  }
}
