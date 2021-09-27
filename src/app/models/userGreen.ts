import {ProfileEnum} from "./profileEnum";
import {Marker} from "./marker";

export interface UserGreen {
  id: number;
  name: string
  email: string;
  profileEnum: ProfileEnum;
  markers: Marker[];

}
