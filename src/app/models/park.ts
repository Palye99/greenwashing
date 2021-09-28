import {Marker} from "./marker";

export interface Park {
  id: number;
  name: string;
  lat: string;
  lng: string;
  markers: Marker[];
}
