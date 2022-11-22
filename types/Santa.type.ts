import { Types } from "mongoose";

export interface IParticipant {
  name: string;
  email: string;
  target?: Types.ObjectId;
}

export interface ISanta {
  name: string;
  notes: string;
  participants: IParticipant[];
}
