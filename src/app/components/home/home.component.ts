import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';
import {User} from '../../models/user';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
import {DockerService} from '../../services/docker.service';
import {takeUntil} from 'rxjs/operators';
import {DestroyedDirective} from '../../services/destroyed.directive';
import {ResultCommand} from '../../models/resultCommand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DestroyedDirective implements OnInit {
  user: User;

  containerJava: boolean = false;
  containerJS: boolean = false;
  containerBash: boolean = false;
  containerPython: boolean = false;

  isLoadingJava: boolean = false;
  isLoadingJS: boolean = false;
  isLoadingBash: boolean = false;
  isLoadingPython: boolean = false;

  errorJava: boolean = false;
  errorJS: boolean = false;
  errorBash: boolean = false;
  errorPython: boolean = false;

  resultCommandJava: string;
  resultCommandJS: string;
  resultCommandBash: string;
  resultCommandPython: string;

  errorCommandeJava: string;
  errorCommandeJS: string;
  errorCommandeBash: string;
  errorCommandePython: string;

  constructor(private authService: AuthService,
              private dockerService: DockerService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    if (this.authService && this.authService.userData) {
      this.user = this.authService.userData;
    }
  }

  signOut() {
    this.authService.SignOut();
  }

  userInfo() {
    const ref = this.dialog.open(PopupComponent);
    console.log('modal info');
  }

  choice(val: number) {
    switch(val) {
      case 1:
        console.log('Java');
        if (!this.containerJava) {
          this.containerJava = true;
          this.isLoadingJava = true;
          this.dockerService.dockerChoice(1).pipe(takeUntil(this.destroyed)).subscribe((value: ResultCommand) => {
            this.resultCommandJava = value.result;
            this.errorCommandeJava = value.error;
          }, (e) => {
            console.log(e);
            this.errorJava = true;
            this.isLoadingJava = false;
          }, () => {
            this.isLoadingJava = false;
          });
        }
        break;
      case 2:
        console.log('JS');
        if (!this.containerJS) {
          this.containerJS = true;
          this.isLoadingJS = true;
          this.dockerService.dockerChoice(2).pipe(takeUntil(this.destroyed)).subscribe((value: ResultCommand) => {
            this.resultCommandJS = value.result;
            this.errorCommandeJS = value.error;
          }, (e) => {
            console.log(e);
            this.isLoadingJS = false;
            this.errorJS = true;
          }, () => {
            this.isLoadingJS = false;
          });
        }
        break;
      case 3:
        console.log('Bash');
        if (this.containerBash) {
          this.containerBash = true;
          this.isLoadingBash = true;
          this.dockerService.dockerChoice(3).pipe(takeUntil(this.destroyed)).subscribe((value: ResultCommand) => {
            this.resultCommandBash = value.result;
            this.errorCommandeBash = value.error;
          }, (e) => {
            console.log(e);
            this.isLoadingBash = false;
            this.errorBash = true;
          }, () => {
            this.isLoadingBash = false;
          });
        }
        break;
      case 4:
        console.log('Python');
        if (this.containerPython) {
          this.containerPython = true;
          this.isLoadingPython = true;
          this.dockerService.dockerChoice(4).pipe(takeUntil(this.destroyed)).subscribe((value: ResultCommand) => {
            this.resultCommandPython = value.result;
            this.errorCommandePython = value.error;
          }, (e) => {
            console.log(e);
            this.isLoadingPython = false;
            this.errorPython = true;
          }, () => {
            this.isLoadingPython = false;
          });
        }
        break;
    }

  }
}
