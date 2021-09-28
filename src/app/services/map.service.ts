import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Marker} from "../models/marker";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  addMarker(m: Marker) {
    return this.http.post(`${environment.env_api_url}/map/addMarker`, m);
  }

  allMarker() {
    return this.http.get(`${environment.env_api_url}/map/allMarker`);
  }

}
