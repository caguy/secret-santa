import { ResponseOrError } from "@/core/helpers";
import { ISantaModelType } from "@/models";
import { ISantaParticipation } from "@/types";

type GetSantaServiceResponse = ISantaParticipation | undefined;

type GetSantaServiceErrors =
  | "SANTA_NOT_FOUND"
  | "PARTICIPANT_NOT_FOUND"
  | "TARGET_NOT_FOUND"
  | "INTERNAL_ERROR"
  | undefined;

const GetSanta =
  (Santa: ISantaModelType) =>
  async ({
    santaId,
    participantId,
  }: {
    santaId: string;
    participantId: string;
  }): Promise<
    ResponseOrError<GetSantaServiceResponse, GetSantaServiceErrors>
  > => {
    try {
      const santa = await Santa.findById(santaId);
      if (!santa) return ResponseOrError.error("SANTA_NOT_FOUND");

      const participant = santa.participants.find((participant) =>
        participant._id.equals(participantId)
      );
      if (!participant) return ResponseOrError.error("PARTICIPANT_NOT_FOUND");

      const target = santa.participants.find((p) =>
        p?._id.equals(participant.target)
      );
      if (!target) return ResponseOrError.error("TARGET_NOT_FOUND");

      return ResponseOrError.success({
        name: santa.name,
        notes: santa.notes,
        participantName: participant.name,
        target: { name: target.name, email: target.email },
      });
    } catch (err) {
      return ResponseOrError.error("INTERNAL_ERROR", err);
    }
  };

export default GetSanta;
