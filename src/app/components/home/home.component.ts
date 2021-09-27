import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth';
import {User} from '../../models/user';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
import {DockerService} from '../../services/docker.service';
import {DestroyedDirective} from '../../services/destroyed.directive';

import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DestroyedDirective implements OnInit {
  user: User;
  mymap: any;

  constructor(private authService: AuthService,
              private dockerService: DockerService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.mymap = L.map('mapid').setView([45.764043, 4.835659], 13);

    //mapbox map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoicGFseWUiLCJhIjoiY2t0dmlxNmIyMmFvdzMwbXBoenV6MDFrayJ9.IbnJrzNqvuN0zVy5gv2o3Q'
    }).addTo(this.mymap);

    // openstreet map
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: 'Frugal Map'
    // }).addTo(mymap);

    // Cooordonnée du fichier erronée
    // parcs.features.forEach(x => {
    //   var polygone = [];
    //
    //   x.geometry.coordinates[0].forEach(y => polygone.push(y));
    //
    //   var coucou = L.polygon(polygone, {
    //     color: 'green',
    //     fillColor: '#43b144',
    //     fillOpacity: 0.2
    //   }).addTo(mymap);
    //
    //   console.log(coucou);
    // });

    this.mymap
      .on('click', this.onMapClick, this);


    if (this.authService && this.authService.userData) {
      this.user = this.authService.userData;
    }
  }


  onMapClick(e) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("Coordonnées : " + e.latlng.toString() + `<button class="btn btn-secondary" (click)="userInfo()"><i class="fas fa-user-tag"></i></button>`)
      .openOn(this.mymap);
  }

  signOut() {
    this.authService.SignOut();
  }

  userInfo() {
    const ref = this.dialog.open(PopupComponent);
    console.log('modal info');
  }
}
