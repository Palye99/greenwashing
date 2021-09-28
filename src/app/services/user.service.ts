import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserGreen} from "../models/userGreen";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserGreen) {
    return this.http.post(`${environment.env_api_url}/user/register`, user);
  }

  getUser(email: string) {
    return this.http.get(`${environment.env_api_url}/user/getUserWithEmail/${email}`);
  }
}
