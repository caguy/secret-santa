import { IParticipant, ISanta } from "@/types";
import { Model, Schema, Types } from "mongoose";

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
