import {Component, Input, OnInit} from '@angular/core';
import {Marker} from "../../models/marker";
import {MatDialogRef} from "@angular/material/dialog";
import {UserGreen} from "../../models/userGreen";
import {StatutEnum} from "../../models/statutEnum";

@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrls: ['./add-marker.component.scss']
})
export class AddMarkerComponent implements OnInit {
  @Input()
  tmpMarker: any;
  @Input()
  userGreen: UserGreen;

  marker: Marker;
  name: string;
  desc: string;

  constructor(public dialogRef: MatDialogRef<AddMarkerComponent>) { }

  ngOnInit(): void {
    this.marker = {
      typeEnum: null,
      statutEnum: StatutEnum.DECLARE,
      id: null,
      name: '',
      description: '',
      dateCreation: new Date(),
      lat: this.tmpMarker.lat,
      lng: this.tmpMarker.lng,
      image: null,
      user: this.userGreen
    }
  }

  closeDialog() {
    this.dialogRef.close(this.marker);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
