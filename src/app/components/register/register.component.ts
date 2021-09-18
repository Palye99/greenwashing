import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: any;

  constructor(private authService: AuthService) {
    // do nothing.
  }

  ngOnInit(): void {
    // do nothing.
  }

  signUp() {
    this.authService.SignUp(this.email, this.password);
  }

  googleAuth() {
    this.authService.GoogleAuth();
  }

}
