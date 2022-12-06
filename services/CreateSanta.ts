import { ResponseOrError } from "@/core/helpers";
import { ISantaModelType } from "@/models";
import { ISanta } from "@/types";
import { shuffle } from "lodash";
import jwt from "jsonwebtoken";

type CreateSantaServiceResponse = void;
type CreateSantaServiceErrors = "CREATION_ERROR" | "NOTIFICATION_ERROR";

const CreateSanta =
  (Santa: ISantaModelType) =>
  async (
    santaToCreate: ISanta
  ): Promise<
    ResponseOrError<CreateSantaServiceResponse, CreateSantaServiceErrors>
  > => {
    try {
      const santa = new Santa(santaToCreate);
      const shuffledParticipants = shuffle(santa.participants);

      shuffledParticipants.forEach((shuffledParticipant, index) => {
        const participantIndex = santa.participants.findIndex((participant) =>
          participant._id.equals(shuffledParticipant._id)
        );
        const targetId =
          shuffledParticipants[index + 1]?._id ?? shuffledParticipants[0]?._id;
        if (!!targetId) {
          santa.participants[participantIndex].target = targetId;
          const token = jwt.sign(
            {
              santaId: santa._id,
              participantId: santa.participants[participantIndex]._id,
            },
            process.env.JWT_SECRET
          );
          console.log(token);
        } else {
          throw new Error();
        }
      });
      await santa.save();
    } catch (err) {
      return ResponseOrError.error("CREATION_ERROR", err);
    }

    return ResponseOrError.success();
  };

export default CreateSanta;
