import { getDatabase, getModel } from "@/database";
import { ISanta, ISantaModelType, SantaSchema } from "@/models";
import { shuffle } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const db = await getDatabase();
  const Santa = getModel<ISanta, ISantaModelType>(db, "santas", SantaSchema);

  switch (method) {
    case "GET": {
      const { santaId, participantId } = req.body;
      const santa = await Santa.findById(santaId);
      if (santa === null) return res.status(404).end();

      const participant = santa.participants.id(participantId);
      if (participant === null) return res.status(404).end();

      const target = santa.participants.id(participant.target);
      if (target === null) return res.status(404).end();

      return res.json({ santa, participant, target });
    }
    case "POST": {
      // Todo error handling
      const santaToCreate = req.body as ISanta; // TODO validation
      const santa = new Santa(santaToCreate);
      const shuffledParticipants = shuffle(santa.participants);

      shuffledParticipants.forEach((shuffledParticipant, index) => {
        const participantIndex = santa.participants.findIndex((participant) =>
          participant._id.equals(shuffledParticipant._id)
        );

        const targetId =
          shuffledParticipants[index + 1]?._id ?? shuffledParticipants[0]?._id;
        if (!!targetId) santa.participants[participantIndex].target = targetId;
      });
      await santa.save();
      return res.end();
    }
    default:
      return res.status(405).end();
  }
}
