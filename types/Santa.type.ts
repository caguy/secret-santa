import { Types } from "mongoose";

export interface IParticipant {
  _id: Types.ObjectId;
  name: string;
  email: string;
  target: Types.ObjectId;
}

export interface ISanta {
  name: string;
  notes?: string;
  participants: IParticipant[];
}

export interface ISantaParticipation {
  name: string;
  notes?: string;
  participantName: string;
  target: { name: string; email: string };
}
