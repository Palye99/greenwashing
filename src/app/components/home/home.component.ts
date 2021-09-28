import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth';
import {User} from '../../models/user';
import {Marker} from '../../models/marker';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
import {DestroyedDirective} from '../../services/destroyed.directive';

import * as L from 'leaflet';
import {MapService} from "../../services/map.service";
import {AddMarkerComponent} from "../add-marker/add-marker.component";
import {UserService} from "../../services/user.service";
import {UserGreen} from "../../models/userGreen";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DestroyedDirective implements OnInit {
  @ViewChild('alertSuccess', { static: true }) alertSuccess: ElementRef;
  @ViewChild('cleanSuccess', { static: true }) cleanSuccess: ElementRef;
  @ViewChild('alertError', { static: true }) alertError: ElementRef;

  user: User;
  userGreen: UserGreen;
  mymap: any;
  tmpMarker: any;
  leafIcon = L.icon({
    iconUrl: '../../../assets/bin.png',
    iconSize: [35, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });

  constructor(private authService: AuthService,
              private mapService: MapService,
              private userService: UserService,
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

    this.mymap.on('click', this.onMapClick, this);

    if (this.authService && this.authService.userData) {
      this.user = this.authService.userData;
      this.userService.getUser(this.user.email).subscribe((value: UserGreen) => { this.userGreen = value; console.log(this.userGreen);});
    }

    this.mapService.allMarker().subscribe((value: Marker[]) => {
      value.forEach(m => {
        L.marker([parseFloat(m.lat), parseFloat(m.lng)], {icon: this.leafIcon}).addTo(this.mymap);
      });
    });
  }

  onMapClick(e) {
    this.tmpMarker = e.latlng;
    console.log(this.tmpMarker);
    L.popup()
      .setLatLng(e.latlng)
      .setContent("Coordonnées : " + e.latlng.toString())
      .openOn(this.mymap);
  }

  signOut() {
    this.authService.SignOut();
  }

  signIn() {
  }

  userInfo() {
    const ref = this.dialog.open(PopupComponent);
    console.log('modal info');
  }

  reportWaster() {
    if(this.tmpMarker) {
      const ref = this.dialog.open(AddMarkerComponent);
      ref.componentInstance.tmpMarker = this.tmpMarker;
      ref.componentInstance.userGreen = this.userGreen;

      ref.afterClosed().subscribe((result: Marker) => {
        if(result) {
          L.marker(this.tmpMarker, {icon: this.leafIcon}).addTo(this.mymap);
          this.alertSuccess.nativeElement.classList.add('show');

          this.mapService.addMarker(result).subscribe(value => console.log('send db', value));
        }
      });
    } else {
      this.alertError.nativeElement.classList.add('show');
    }
  }

  cleanWaster() {
    if(this.tmpMarker) {
      this.cleanSuccess.nativeElement.classList.add('show');
      // suppression dans la base

    } else {
      this.alertError.nativeElement.classList.add('show');
    }
  }

  closeAlertSuccess() {
    this.alertSuccess.nativeElement.classList.remove('show');
  }

  closeCleanSuccess() {
    this.cleanSuccess.nativeElement.classList.remove('show');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
  }

  dashboard() {
    const ref = this.dialog.open(DashboardComponent, {height:'90%' ,width:'90%'});
  }
}
