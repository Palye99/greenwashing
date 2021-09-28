import {Component, Input, OnInit} from '@angular/core';
import {Marker} from "../../models/marker";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrls: ['./add-marker.component.scss']
})
export class AddMarkerComponent implements OnInit {
  @Input()
  tmpMarker: any;

  marker: Marker;
  name: string;
  desc: string;

  constructor(public dialogRef: MatDialogRef<AddMarkerComponent>) { }

  ngOnInit(): void {
    this.marker = {
      id: null,
      name: '',
      desc: '',
      lat: this.tmpMarker.lat,
      lng: this.tmpMarker.lng,
      image: null,
      user: null
    }
  }

  closeDialog() {
    this.dialogRef.close(this.marker);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
