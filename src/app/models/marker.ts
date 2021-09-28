import {Image} from "./image";
import {UserGreen} from "./userGreen";
import {StatutEnum} from "./statutEnum";
import {TypeEnum} from "./typeEnum";

export interface Marker {
  id: number;
  name: string;
  description: string;
  lat: string;
  lng: string;
  dateCreation: Date;
  statutEnum: StatutEnum;
  typeEnum: TypeEnum;
  image: Image;
  user: UserGreen;
}
