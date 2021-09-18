import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  email: string;

  constructor(private authService: AuthService) {
    // do nothing.
  }

  ngOnInit(): void {
    // do nothing.
  }

  resetPassword() {
    this.authService.ForgotPassword(this.email);
  }
}
