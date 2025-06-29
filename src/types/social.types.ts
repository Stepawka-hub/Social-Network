import { TLocation, TPhotos } from "./shared.types";
import { TUser } from "./user.types";

export type TSocialUser = TUser & {
  photos: TPhotos;
  location: TLocation;
  followed: boolean;
};