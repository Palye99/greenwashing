import {Component, Input, OnInit} from '@angular/core';
import {UserGreen} from "../../models/userGreen";
import {Marker} from "../../models/marker";
import {MatDialogRef} from "@angular/material/dialog";
import {StatutEnum} from "../../models/statutEnum";
import {TypeEnum} from "../../models/typeEnum";

@Component({
  selector: 'app-update-marker',
  templateUrl: './update-marker.component.html',
  styleUrls: ['./update-marker.component.scss']
})
export class UpdateMarkerComponent implements OnInit {
  @Input()
  tmpMarkerUpdate: Marker;
  @Input()
  userGreen: UserGreen;

  typeEnum: any;
  statutEnum: any;

  constructor(public dialogRef: MatDialogRef<UpdateMarkerComponent>) { }

  ngOnInit(): void {
    this.typeEnum = TypeEnum[this.tmpMarkerUpdate.typeEnum];
    this.statutEnum = StatutEnum[this.tmpMarkerUpdate.statutEnum];

    console.log(this.tmpMarkerUpdate, this.typeEnum, this.statutEnum);
  }

  closeDialog() {
    this.tmpMarkerUpdate.typeEnum = this.typeEnum;
    this.tmpMarkerUpdate.statutEnum = this.statutEnum;
    this.dialogRef.close(this.tmpMarkerUpdate);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
