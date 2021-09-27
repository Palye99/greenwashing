import {Image} from "./image";
import {User} from "./user";

export interface Marker {
  id: number;
  name: string;
  desc: string;
  lat: string;
  lng: string;
  image: Image;
  user: User;
}
