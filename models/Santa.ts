import { Model, Schema, Types } from "mongoose";

export interface IParticipant {
  _id: Types.ObjectId;
  name: String;
  email: String;
  target: Types.ObjectId;
}

export interface ISanta {
  name: string;
  notes?: string;
  participants: IParticipant[];
}

type ISantaDocumentProps = {
  participants: Types.DocumentArray<IParticipant>;
};

export type ISantaModelType = Model<ISanta, {}, ISantaDocumentProps>;

export const SantaSchema = new Schema<ISanta>(
  {
    name: String,
    notes: String,
    participants: [
      {
        name: String,
        email: String,
        target: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);
