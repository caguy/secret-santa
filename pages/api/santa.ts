import { getDatabase, getModel } from "@/core/database";
import { ISantaModelType, SantaSchema } from "@/models";
import { CreateSantaService } from "@/services";
import { ISanta } from "@/types";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const postSantaBodySchema = Joi.object({
  name: Joi.string().required(),
  notes: Joi.string().optional().allow(null, ""),
  participants: Joi.array()
    .required()
    .min(1)
    .items(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: false })
          .required(),
      })
    ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let Santa;

  try {
    const db = await getDatabase();
    Santa = getModel<ISanta, ISantaModelType>(db, "santas", SantaSchema);
    if (Santa === undefined) throw Error();
  } catch (err) {
    return res.status(500).end();
  }

  const CreateSanta = CreateSantaService(Santa);

  switch (method) {
    case "GET": {
      const { santaId, participantId } = req.body;

      if (santaId === undefined || participantId === undefined)
        return res.status(400).end();

      const santa = await Santa.findById(santaId);
      if (santa === null) return res.status(404).end();

      const participant = santa.participants.id(participantId);
      if (participant === null) return res.status(404).end();

      const target = santa.participants.id(participant.target);
      if (target === null) return res.status(404).end();

      return res.json({ santa, participant, target });
    }
    case "POST": {
      const santaToCreate = req.body as ISanta;

      const { error } = postSantaBodySchema.validate(santaToCreate);
      if (error) return res.status(400).send(error.message);

      const result = await CreateSanta(santaToCreate);
      if (result.isFailure()) return res.status(500).end();
      return res.end();
    }
    default:
      return res.status(405).end();
  }
}
