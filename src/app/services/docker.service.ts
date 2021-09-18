import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(private http: HttpClient) { }

  dockerChoice(idChoice: number) {
    return this.http.get(`${environment.env_api_url}/docker/${idChoice}`);
  }

  shellCommand(command: string) {
    return this.http.post(`${environment.env_api_url}/docker/command`, command);
  }

  dockerCommand(choixTerm: number, id: string, command: string) {
    return this.http.post(`${environment.env_api_url}/docker/dockerCommand/${choixTerm}/${id}`, command);
  }
}
